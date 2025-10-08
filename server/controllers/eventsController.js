import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, l.name as location_name, l.address, l.city, l.state, l.zip
            FROM events e
            JOIN locations l ON e.location_id = l.id
            ORDER BY e.date, e.time
        `)
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching events:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getEventsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params
        const result = await pool.query(`
            SELECT e.*, l.name as location_name, l.address, l.city, l.state, l.zip
            FROM events e
            JOIN locations l ON e.location_id = l.id
            WHERE e.location_id = $1
            ORDER BY e.date, e.time
        `, [locationId])
        
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching events by location:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(`
            SELECT e.*, l.name as location_name, l.address, l.city, l.state, l.zip
            FROM events e
            JOIN locations l ON e.location_id = l.id
            WHERE e.id = $1
        `, [id])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        
        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching event:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

