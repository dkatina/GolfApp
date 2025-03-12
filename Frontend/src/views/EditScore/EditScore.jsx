import React from 'react'
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useLocation, useNavigate} from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import AddPoint from '../../components/AddPoint';
import RemovePoint from '../../components/RemovePoint';
import './styles.css'
import { Button } from '@mui/material';



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
        navigate('/event-details', { state: { event } });
      };
    


  return (
    <>
    <div className='page-header actions-header'>
      <h1>EditScore</h1>
      <div className='actions'>
        <Button variant='text' onClick={()=>handleLeaderboardClick(event)}>Leaderboard</Button>
      </div>
    </div>
    <div className="body-box">
      <div className="score-box">
        <AddPoint event={event} setScore={setScore}/>
        <div>
          
          <div className='score'>{score}</div>
        </div>
        
        
        <RemovePoint event={event} setScore={setScore}/>
      </div>
    </div>
    </>
  )
}

export default EditScore