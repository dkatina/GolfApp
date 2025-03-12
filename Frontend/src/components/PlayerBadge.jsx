import React from 'react'
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { Button } from '@mui/material';

const PlayerBadge = ({invitee, event, status, invited, setInvited}) => {
    const navigate = useNavigate();
    const {player} = usePlayer();

    const handleClick = async (e) => {
        const token = player.token
        e.preventDefault();
        try {
          const response = await api.put(`/events/${event.id}/invite-player/${invitee.id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          
          setInvited([...invited, invitee.id])
        } catch (error) {
          alert(error.response?.data?.message || 'An error occurred');
        }
      };


  return (
    <div className="player-badge">
        <h4 styles={'display: inline;'}>{invitee.name} </h4>
        {status==='invite'? <Button variant="contained" className='invite-button' onClick={handleClick}>Invite</Button>: <div className='status'>{status}</div>}
    </div>
  )
}

export default PlayerBadge