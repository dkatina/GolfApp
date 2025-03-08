import React from 'react'
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

const PlayerBadge = ({invitee, event, status}) => {
    const navigate = useNavigate();
    const {player} = usePlayer();

    const handleClick = async (e) => {
        const token = player.token
        console.log(token)
        e.preventDefault();
        try {
          const response = await api.put(`/events/${event.id}/invite-player/${invitee.id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          alert(response.data.message)
          navigate('/invite-player', { state: { event } })
        } catch (error) {
          alert(error.response?.data?.message || 'An error occurred');
        }
      };


  return (
    <div>
        <h4 styles={'display: inline;'}>{invitee.name}: </h4>
        {status=='invite'? <button styles={'display: inline;'} onClick={handleClick}>Invite</button>: <h4>{status}</h4>}
    </div>
  )
}

export default PlayerBadge