import React from 'react'
import api from '../api/axios'
import { usePlayer } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';


const AcceptButton = ( {event} ) => {
    const {player} = usePlayer();
    const navigate = useNavigate();

    const handleClick = async (e) =>{
        const token = player.token
       
        try {
            const response = await api.put(`/players/accept-invite/${event.id}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
          
            navigate('/events/show')
          } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
          }
    }


  return (

    <CheckIcon onClick={handleClick}/>
  )
}

export default AcceptButton