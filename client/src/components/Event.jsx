import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import { formatTime, formatRemainingTime, formatNegativeTimeRemaining } from '../services/dates'
import '../css/Event.css'

const Event = (props) => {
    const [event, setEvent] = useState({})
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)
                setEvent(eventData)
            } catch (error) {
                console.error('Error fetching event:', error)
            }
        })()
    }, [props.id])

    useEffect(() => {
        if (event.time) {
            const formattedTime = formatTime(event.time)
            setTime(formattedTime)
        }
    }, [event.time])

    useEffect(() => {
        if (event.date && event.time) {
            const timeRemaining = formatRemainingTime(event.date, event.time)
            setRemaining(timeRemaining)
            formatNegativeTimeRemaining(timeRemaining, event.id)
        }
    }, [event.date, event.time, event.id])

    return (
        <article className='event-information'>
            <img src={event.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event