import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import api from '../../api/axios';
import PlayerBadge from '../../components/PlayerBadge';
import { TextField } from '@mui/material';
import './InvitePlayer.css'

const InvitePlayer = () => {
    const [playerName, setPlayerName] = useState();
    const [players, setPlayers] = useState([]);
    const {player} = usePlayer();
    const location = useLocation()
    const event = location.state.event
    const [invited, setInvited] = useState(event.invites)
    const playing = event.event_players

    const handleChange = (e) => {
         setPlayerName(e.target.value);
         
      };

    useEffect(() => {
    const fetchPlayers = async () => {
        const token = player.token;
        if (!token) {
        setError('No authentication token found');
        return;
        }

        try {
        const response = await api.get(`/players/search?name=${playerName}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });
      
        setPlayers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            
        }
    };
    fetchPlayers();
    if (playerName == ''){
        setPlayers([])
     }
    }, [playerName]);


  return (
    <>
    <div className='page-header'>
        <h1>InvitePlayer</h1>
        {console.log(invited)}
    </div>
    <div className='ibody-box'>
        <form onSubmit={() => handleSubmit()}>
            <TextField
            label="Player Name"
            type="text"
            name="playername"
            placeholder="Player Name"
            value={playerName}
            onChange={handleChange}
            className="invite"
            />
        </form>
        {players.length > 0&&
            <div className='player-box'>
                {players.map((invitee) =>(
                    player.id == invitee.id
                    ?
                    <></>
                    :
                    invited.filter((iplayer) => (iplayer == invitee.id)).length > 0
                    ?
                        <PlayerBadge invitee={invitee} event={event} status={ 'invited' }/>
                    :
                    playing.filter((pplayer) => (pplayer.player_id == invitee.id)).length > 0
                    ?
                        <PlayerBadge invitee={invitee} event={event} status={ 'playing' }/>
                    :
                        <PlayerBadge invitee={invitee} event={event} status={ 'invite' } invited={invited} setInvited={setInvited}/> 
                ))}
            </div>
        }
    </div>
    </>
  )
}

export default InvitePlayer