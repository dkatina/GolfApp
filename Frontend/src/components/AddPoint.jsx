import React from 'react'
import { usePlayer } from '../context/PlayerContext'
import api from '../api/axios';


const AddPoint = ({event, setScore}) => {
    const {player} = usePlayer();

    const handleClick = async (e) =>{
        const token = player.token
        e.preventDefault()
        try {
            const response = await api.put(`/players/add-event-point/${event.id}`,{}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            setScore(response.data.event_score)
          } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
          }
    }

  return (
    <button onClick={(e)=> handleClick(e)}>Add Point</button>
  )
}

export default AddPoint