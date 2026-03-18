-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial indexes
CREATE INDEX idx_facilities_location ON facilities USING GIST (location);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_timeslots_court_id ON timeslots(court_id);
CREATE INDEX idx_courts_facility_id ON courts(facility_id);
CREATE INDEX idx_users_email ON users(email);

