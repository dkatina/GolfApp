import React from 'react'
import { usePlayer } from '../context/PlayerContext'
import api from '../api/axios';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const RemovePoint = ({event, setScore}) => {
    const {player} = usePlayer();

    const handleClick = async (e) =>{
        const token = player.token
        e.preventDefault()
        try {
            const response = await api.delete(`/players/remove-event-point/${event.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            setScore(response.data.event_score)
          } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
          }
    }

  return (
    <Button onClick={(e)=> handleClick(e)}><KeyboardArrowDownIcon sx={{fontSize: 70}}/></Button>
  )
}

export default RemovePoint