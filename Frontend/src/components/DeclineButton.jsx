import React from 'react'
import api from '../api/axios'
import { usePlayer } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

const DeclineButton = ( {event} ) => {
    const {player} = usePlayer();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        const token = player.token;

        e.preventDefault();
        try {
            const response = await api.delete(`/players/decline-invite/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
      
            navigate('/events/show');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };
    


  return (
    <CloseIcon onClick={handleClick}/>
  )
}

export default DeclineButton