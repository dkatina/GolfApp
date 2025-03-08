import React from 'react'
import api from '../api/axios'
import { usePlayer } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'

const DeclineButton = ( {event} ) => {
    const {player} = usePlayer();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        const token = player.token;
        console.log(token);
        e.preventDefault();
        try {
            const response = await api.delete(`/players/decline-invite/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            navigate('/events/show');
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };
    


  return (
    <button onClick={handleClick}>Decline</button>
  )
}

export default DeclineButton