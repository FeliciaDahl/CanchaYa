"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1710589000000 = void 0;
class InitialSchema1710589000000 {
    async up(queryRunner) {
        // Enable extensions
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis_topology`);
        // Create Users table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_users_email ON users(email)`);
        await queryRunner.query(`CREATE INDEX idx_users_role ON users(role)`);
        // Create Facilities table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_facilities_owner_id ON facilities(owner_id)`);
        await queryRunner.query(`CREATE INDEX idx_facilities_location ON facilities USING GIST(location)`);
        // Create Courts table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_courts_facility_id ON courts(facility_id)`);
        // Create TimeSlots table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_timeslots_court_id ON timeslots(court_id)`);
        await queryRunner.query(`CREATE INDEX idx_timeslots_available ON timeslots(available)`);
        // Create Bookings table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_bookings_user_id ON bookings(user_id)`);
        await queryRunner.query(`CREATE INDEX idx_bookings_status ON bookings(status)`);
        await queryRunner.query(`CREATE INDEX idx_bookings_user_status ON bookings(user_id, status)`);
        // Create Tournaments table
        await queryRunner.query(`
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
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_tournaments_facility_id ON tournaments(facility_id)`);
        await queryRunner.query(`CREATE INDEX idx_tournaments_status ON tournaments(status)`);
        // Create Tournament Participants table
        await queryRunner.query(`
      CREATE TABLE tournament_participants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        tournament_id UUID NOT NULL,
        user_id UUID NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(tournament_id, user_id)
      )
    `);
        await queryRunner.query(`CREATE INDEX idx_tournament_participants_tournament_id ON tournament_participants(tournament_id)`);
        await queryRunner.query(`CREATE INDEX idx_tournament_participants_user_id ON tournament_participants(user_id)`);
        // Create update trigger function
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
        // Apply triggers
        await queryRunner.query(`CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
        await queryRunner.query(`CREATE TRIGGER update_facilities_updated_at BEFORE UPDATE ON facilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
        await queryRunner.query(`CREATE TRIGGER update_courts_updated_at BEFORE UPDATE ON courts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
        await queryRunner.query(`CREATE TRIGGER update_timeslots_updated_at BEFORE UPDATE ON timeslots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
        await queryRunner.query(`CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
        await queryRunner.query(`CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()`);
    }
    async down(queryRunner) {
        // Drop triggers
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_tournaments_updated_at ON tournaments`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_timeslots_updated_at ON timeslots`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_courts_updated_at ON courts`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_facilities_updated_at ON facilities`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_users_updated_at ON users`);
        // Drop function
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_updated_at_column()`);
        // Drop tables in reverse order
        await queryRunner.query(`DROP TABLE IF EXISTS tournament_participants`);
        await queryRunner.query(`DROP TABLE IF EXISTS tournaments`);
        await queryRunner.query(`DROP TABLE IF EXISTS bookings`);
        await queryRunner.query(`DROP TABLE IF EXISTS timeslots`);
        await queryRunner.query(`DROP TABLE IF EXISTS courts`);
        await queryRunner.query(`DROP TABLE IF EXISTS facilities`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}
exports.InitialSchema1710589000000 = InitialSchema1710589000000;
