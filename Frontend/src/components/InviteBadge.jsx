import React, { useState, useEffect } from 'react'
import { usePlayer } from '../context/PlayerContext'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'


const InviteBadge = () => {
    const {player} = usePlayer()
    const [invites, setInvites] = useState([]);
    const [error, setError] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvites = async () => {
          const token = player.token;
          if (!token) {
            setError('No authentication token found');
            return;
          }
    
          try {
            const response = await api.get('/players/my-invites', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setInvites(Array.isArray(response.data) ? response.data : []);
          } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch Invites');
          }
        };
    
        fetchInvites();
      }, []);
    
    const handleClick = (e) => {
        e.preventDefault()
        navigate('/my-invites', {state : {invites: invites}})
    }


  return (
    <>
    <div onClick={handleClick}>Invites</div>
    {invites?.length != 0 && <p>{invites.length}</p>}
    
    </>
  )
}

export default InviteBadge