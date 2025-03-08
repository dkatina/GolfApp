import React from 'react'
import { useNavigate } from 'react-router-dom'

const EventBadge = ({ event, invite = false }) => {
  const navigate = useNavigate()

  const handleEventClick = (event) => {
    console.log(event)
    navigate('/event-details', { state: { event } });
  };

  return (
    <div onClick={() => handleEventClick(event)}>
        <h2>{event.title}</h2>
        <p>Host: {event.owner.name}</p>
        {invite&&
          <>
          <button>Accept</button>
          <button>Decline</button>
          </>
        }
    </div>
  )
}

export default EventBadge