import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('all')
    const [locations, setLocations] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
                setFilteredEvents(eventsData)
                
                // Extract unique locations from events
                const uniqueLocations = [...new Set(eventsData.map(event => event.location_name))]
                setLocations(uniqueLocations)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        })()
    }, [])

    const handleLocationFilter = (location) => {
        setSelectedLocation(location)
        if (location === 'all') {
            setFilteredEvents(events)
        } else {
            setFilteredEvents(events.filter(event => event.location_name === location))
        }
    }

    const sortEvents = (sortBy) => {
        const sorted = [...filteredEvents].sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(a.date) - new Date(b.date)
                case 'title':
                    return a.title.localeCompare(b.title)
                case 'location':
                    return a.location_name.localeCompare(b.location_name)
                default:
                    return 0
            }
        })
        setFilteredEvents(sorted)
    }

    return (
        <div className='events-page'>
            <header>
                <h1>All Events</h1>
                <p>Discover what's happening around UnityGrid Plaza</p>
            </header>

            <div className='filters'>
                <div className='location-filter'>
                    <label htmlFor='location-select'>Filter by Location:</label>
                    <select 
                        id='location-select'
                        value={selectedLocation} 
                        onChange={(e) => handleLocationFilter(e.target.value)}
                    >
                        <option value='all'>All Locations</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className='sort-options'>
                    <label htmlFor='sort-select'>Sort by:</label>
                    <select 
                        id='sort-select'
                        onChange={(e) => sortEvents(e.target.value)}
                    >
                        <option value='date'>Date</option>
                        <option value='title'>Title</option>
                        <option value='location'>Location</option>
                    </select>
                </div>
            </div>

            <main className='events-grid'>
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                        <div key={event.id} className='event-card'>
                            <Event
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                            />
                            <div className='event-location'>
                                <strong>{event.location_name}</strong>
                                <p>{event.address}, {event.city}, {event.state}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='no-events'>
                        <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found!</h2>
                        <p>Try adjusting your filters or check back later for new events.</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Events

