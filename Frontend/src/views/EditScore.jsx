import React from 'react'
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useLocation, useNavigate} from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import AddPoint from '../components/AddPoint';
import RemovePoint from '../components/RemovePoint';



const EditScore = () => {
    const location = useLocation();
    const event = location.state.event
    const {player} = usePlayer();
    const [score, setScore] = useState(0);
    const [error, setError] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScore = async () => {
          const token = player.token;
          if (!token) {
            setError('No authentication token found');
            return;
          }
    
          try {
            const response = await api.get(`/events/${event.id}/my-score`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setScore(response.data.event_score)
          } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch Score');
          }
        };
    
        fetchScore();
      }, []);

      const handleLeaderboardClick = (event) => {
        console.log(event)
        navigate('/event-details', { state: { event } });
      };
    


  return (
    <>
    <div>EditScore</div>
    <h2>{score}</h2>
    <AddPoint event={event} setScore={setScore}/>
    <RemovePoint event={event} setScore={setScore}/>
    <button onClick={()=>handleLeaderboardClick(event)}>Leaderboard</button>
    </>
  )
}

export default EditScore