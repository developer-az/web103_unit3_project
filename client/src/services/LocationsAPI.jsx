const API_BASE_URL = 'http://localhost:3000/api'

const getAllLocations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching locations:', error)
        throw error
    }
}

const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching location:', error)
        throw error
    }
}

const LocationsAPI = {
    getAllLocations,
    getLocationById
}

export default LocationsAPI

