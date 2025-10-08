import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const reset = async () => {
    try {
        // Drop tables if they exist
        await pool.query('DROP TABLE IF EXISTS events CASCADE')
        await pool.query('DROP TABLE IF EXISTS locations CASCADE')
        
        // Create locations table
        await pool.query(`
            CREATE TABLE locations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(50) NOT NULL,
                zip VARCHAR(20) NOT NULL,
                image VARCHAR(500),
                description TEXT
            )
        `)
        
        // Create events table
        await pool.query(`
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                time TIME NOT NULL,
                image VARCHAR(500),
                description TEXT,
                location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
            )
        `)
        
        // Insert sample locations
        await pool.query(`
            INSERT INTO locations (name, address, city, state, zip, image, description) VALUES
            ('Echo Lounge', '1323 N Stemmons Fwy', 'Dallas', 'TX', '75207', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', 'Intimate venue for live music and performances'),
            ('House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1571266028243-e68f857cf30f?w=500', 'Legendary music venue with soulful atmosphere'),
            ('Pavilion', '1818 First Ave', 'Dallas', 'TX', '75210', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', 'Outdoor amphitheater for concerts and events'),
            ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 'Major arena for sports and entertainment')
        `)
        
        // Insert sample events
        await pool.query(`
            INSERT INTO events (title, date, time, image, description, location_id) VALUES
            ('Jazz Night with Sarah Chen', '2024-02-15', '20:00:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', 'An evening of smooth jazz and contemporary music', 1),
            ('Indie Rock Showcase', '2024-02-20', '19:30:00', 'https://images.unsplash.com/photo-1571266028243-e68f857cf30f?w=500', 'Local indie bands take the stage', 1),
            ('Blues Legends Tribute', '2024-02-18', '21:00:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', 'Celebrating the greats of blues music', 2),
            ('Soul Revival Night', '2024-02-25', '20:30:00', 'https://images.unsplash.com/photo-1571266028243-e68f857cf30f?w=500', 'Classic soul music with modern twist', 2),
            ('Summer Concert Series', '2024-03-01', '19:00:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', 'Outdoor concert under the stars', 3),
            ('Acoustic Sessions', '2024-03-05', '18:30:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', 'Intimate acoustic performances', 3),
            ('Mavericks vs Lakers', '2024-02-22', '19:30:00', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 'NBA basketball game', 4),
            ('Taylor Swift Concert', '2024-03-10', '20:00:00', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 'The Eras Tour comes to Dallas', 4),
            ('Comedy Night', '2024-02-28', '20:00:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500', 'Stand-up comedy featuring local comedians', 1),
            ('Electronic Music Festival', '2024-03-15', '18:00:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', 'All-day electronic music experience', 3)
        `)
        
        console.log('Database reset completed successfully!')
        console.log('Created tables: locations, events')
        console.log('Inserted sample data for 4 locations and 10 events')
        
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        await pool.end()
    }
}

reset()

