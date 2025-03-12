import React from 'react'
import './styles.css'

const EventPlayer = ({ player }) => {
  const scoreBar = {
   width: `${player.event_score *13 + 1}px`,
   height: '10px',
   backgroundColor: "black",
   marginTop: '4px'
  }

  return (
    <div className='event-player'>
        <p key={player.player.id}>{player.player.name}</p>
        <div className='score-bar'>
          <div style={scoreBar}></div>
          <p>{player.event_score}</p>
        </div>
    </div>
  )
}

export default EventPlayer