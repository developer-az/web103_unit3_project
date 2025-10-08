export const formatTime = (timeString) => {
    if (!timeString) return ''
    
    try {
        const [hours, minutes] = timeString.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour % 12 || 12
        
        return `${displayHour}:${minutes} ${ampm}`
    } catch (error) {
        console.error('Error formatting time:', error)
        return timeString
    }
}

export const formatRemainingTime = (eventDate, eventTime) => {
    if (!eventDate || !eventTime) return ''
    
    try {
        const eventDateTime = new Date(`${eventDate}T${eventTime}`)
        const now = new Date()
        const timeDiff = eventDateTime - now
        
        if (timeDiff < 0) {
            return 'Event has passed'
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        
        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''} remaining`
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''} remaining`
        } else {
            return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`
        }
    } catch (error) {
        console.error('Error calculating remaining time:', error)
        return ''
    }
}

export const formatNegativeTimeRemaining = (remaining, eventId) => {
    if (remaining === 'Event has passed') {
        const element = document.getElementById(`remaining-${eventId}`)
        if (element) {
            element.style.color = '#ff6b6b'
            element.style.textDecoration = 'line-through'
        }
    }
}

