import React from 'react'
import { useNavigate } from 'react-router-dom'
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import './styles.css' 

const EventBadge = ({ event, invite = false }) => {
  const navigate = useNavigate()

  const handleEventClick = (event) => {
    navigate('/event-details', { state: { event } });
  };

  return (
    <>
    <div className="event-badge" onClick={() => handleEventClick(event)}>
        <div>
        <h2>{event.title}</h2>
        <p>Host: {event.owner.name}</p>
        </div>
        {invite&&
      <div className='action-box'>
      <AcceptButton event={event}/>
      <DeclineButton event={event}/>
      </div>
    }
        
    </div>
    
    </>
  )
}

export default EventBadge