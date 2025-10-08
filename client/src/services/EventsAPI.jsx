const API_BASE_URL = 'http://localhost:3000/api'

const getAllEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events:', error)
        throw error
    }
}

const getEventsByLocation = async (locationId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/location/${locationId}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching events by location:', error)
        throw error
    }
}

const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching event:', error)
        throw error
    }
}

const EventsAPI = {
    getAllEvents,
    getEventsByLocation,
    getEventById
}

export default EventsAPI

