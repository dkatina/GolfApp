import React from 'react'

const EventPlayer = ({ player }) => {
  return (
    <div>
        <p key={player.player.id}>{player.player.name}</p>
        <p>{player.event_score}</p>
    </div>
  )
}

export default EventPlayer