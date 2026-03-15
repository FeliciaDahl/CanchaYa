-- CanchaYa Database Schema
-- PostgreSQL with PostGIS

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role VARCHAR(20) NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'facility_owner', 'admin')),
  oauth_provider VARCHAR(50) CHECK (oauth_provider IN ('google', 'apple')),
  oauth_id VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_oauth_provider_id ON users(oauth_provider, oauth_id);
-- Unique constraint on oauth credentials (partial, allows NULL for non-oauth users)
ALTER TABLE users ADD CONSTRAINT uq_users_oauth UNIQUE(oauth_provider, oauth_id) WHERE oauth_provider IS NOT NULL;

-- Facilities Table
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  phone VARCHAR(20),
  website VARCHAR(500),
  image_urls JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_facilities_owner_id ON facilities(owner_id);
CREATE INDEX idx_facilities_city ON facilities(city);
CREATE INDEX idx_facilities_location ON facilities USING GIST(location);

-- Courts Table
CREATE TABLE courts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  facility_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  surface VARCHAR(50) NOT NULL CHECK (surface IN ('clay', 'artificial', 'hard')),
  has_lights BOOLEAN DEFAULT FALSE,
  capacity INT DEFAULT 4,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE
);

CREATE INDEX idx_courts_facility_id ON courts(facility_id);
CREATE INDEX idx_courts_surface ON courts(surface);

-- Time Slots Table
CREATE TABLE timeslots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  court_id UUID NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (court_id) REFERENCES courts(id) ON DELETE CASCADE,
  CHECK (end_time > start_time)
);

CREATE INDEX idx_timeslots_court_id ON timeslots(court_id);
CREATE INDEX idx_timeslots_start_time ON timeslots(start_time);
CREATE INDEX idx_timeslots_available ON timeslots(available);
CREATE INDEX idx_timeslots_court_time ON timeslots(court_id, start_time);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  timeslot_id UUID NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (timeslot_id) REFERENCES timeslots(id) ON DELETE CASCADE
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_timeslot_id ON bookings(timeslot_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_bookings_user_timeslot ON bookings(user_id, timeslot_id);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Tournaments Table (Phase 2)
CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  facility_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  max_participants INT NOT NULL,
  current_participants INT DEFAULT 0,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
  CHECK (end_date > start_date)
);

CREATE INDEX idx_tournaments_facility_id ON tournaments(facility_id);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_tournaments_dates ON tournaments(start_date, end_date);

-- Tournament Participants Table (Phase 2)
CREATE TABLE tournament_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tournament_id UUID NOT NULL,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(tournament_id, user_id)
);

CREATE INDEX idx_tournament_participants_tournament_id ON tournament_participants(tournament_id);
CREATE INDEX idx_tournament_participants_user_id ON tournament_participants(user_id);

-- Create views for common queries

-- Nearby facilities view (for search optimization)
CREATE OR REPLACE VIEW v_nearby_facilities AS
SELECT 
  f.id,
  f.name,
  f.address,
  f.city,
  ST_AsText(f.location) as location,
  u.name as owner_name,
  u.phone as owner_phone,
  COUNT(DISTINCT c.id) as court_count,
  COUNT(DISTINCT CASE WHEN b.status = 'confirmed' THEN b.id END) as active_bookings
FROM facilities f
LEFT JOIN users u ON f.owner_id = u.id
LEFT JOIN courts c ON f.id = c.facility_id
LEFT JOIN timeslots ts ON c.id = ts.court_id
LEFT JOIN bookings b ON ts.id = b.timeslot_id AND b.status = 'confirmed'
GROUP BY f.id, u.id;

-- Facility availability view
CREATE OR REPLACE VIEW v_facility_availability AS
SELECT 
  f.id as facility_id,
  f.name as facility_name,
  c.id as court_id,
  c.name as court_name,
  c.surface,
  ts.id as timeslot_id,
  ts.start_time,
  ts.end_time,
  ts.price,
  ts.available,
  CASE WHEN COUNT(b.id) > 0 THEN 'booked' ELSE 'available' END as status
FROM facilities f
JOIN courts c ON f.id = c.facility_id
JOIN timeslots ts ON c.id = ts.court_id
LEFT JOIN bookings b ON ts.id = b.timeslot_id AND b.status IN ('pending', 'confirmed')
WHERE ts.start_time > CURRENT_TIMESTAMP
GROUP BY f.id, c.id, ts.id;

-- Facility owner dashboard view
CREATE OR REPLACE VIEW v_facility_owner_dashboard AS
SELECT 
  f.id,
  f.name,
  u.name as owner_name,
  COUNT(DISTINCT c.id) as total_courts,
  COUNT(DISTINCT CASE WHEN ts.available = TRUE AND ts.start_time > CURRENT_TIMESTAMP THEN ts.id END) as available_slots,
  COUNT(DISTINCT CASE WHEN b.status = 'confirmed' AND b.created_at > CURRENT_TIMESTAMP - INTERVAL '30 days' THEN b.id END) as bookings_this_month,
  COALESCE(SUM(CASE WHEN b.status = 'completed' THEN b.total_price ELSE 0 END), 0) as total_revenue
FROM facilities f
LEFT JOIN users u ON f.owner_id = u.id
LEFT JOIN courts c ON f.id = c.facility_id
LEFT JOIN timeslots ts ON c.id = ts.court_id
LEFT JOIN bookings b ON ts.id = b.timeslot_id
GROUP BY f.id, u.id;

-- Create refresh updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_facilities_updated_at BEFORE UPDATE ON facilities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courts_updated_at BEFORE UPDATE ON courts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeslots_updated_at BEFORE UPDATE ON timeslots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- PostGIS Indexes
CREATE INDEX idx_facilities_location_gist ON facilities USING GIST(location);
CREATE INDEX idx_facilities_location_brin ON facilities USING BRIN(location);

-- Analytical indexes
CREATE INDEX idx_bookings_created_at_status ON bookings(created_at DESC, status);
CREATE INDEX idx_courts_facility_surface ON courts(facility_id, surface);
CREATE INDEX idx_timeslots_availability ON timeslots(available, start_time);
