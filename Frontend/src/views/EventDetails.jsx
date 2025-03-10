import React from 'react'
import { useLocation } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import EventPlayer from '../components/EventPlayer'

const EventDetails = () => {

    const location = useLocation()
    const event = location.state.event

    const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const {player} = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = player.token;
      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await api.get(`/events/${event.id}/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlayers(Array.isArray(response.data.players) ? response.data.players : []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch events');
      }
    };
    fetchLeaderboard();
  }, []);

  const handleInvite = (event) => {
    navigate('/invite-player', { state: { event } });
  };

  const handleScore = (event) => {
    navigate('/edit-score', { state: { event } });
  }


  return (
    <>
    <div>EventDetails</div>
    {player.id == event.owner_id&& <button onClick={() => handleInvite(event)}>Invite Player</button>}
    <button onClick={() => handleScore(event)}>Edit Score</button>
    
    <h1>{event.title}</h1>
    {players.map((player) =>(
      <EventPlayer player={player}/>
    ))}
    </>
  )
}

export default EventDetails