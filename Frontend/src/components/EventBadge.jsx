import React from 'react'
import { useNavigate } from 'react-router-dom'
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import './styles.css' 

const EventBadge = ({ event, invite = false }) => {
  const navigate = useNavigate()

  const handleEventClick = (event) => {
    console.log(event)
    navigate('/event-details', { state: { event } });
  };

  return (
    <>
    <div className="event-badge" onClick={() => handleEventClick(event)}>
        <h2>{event.title}</h2>
        <p>Host: {event.owner.name}</p>
        
    </div>
    {invite&&
      <>
      <AcceptButton event={event}/>
      <DeclineButton event={event}/>
      </>
    }
    </>
  )
}

export default EventBadge