import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import api from '../api/axios';
import PlayerBadge from '../components/PlayerBadge';

const InvitePlayer = () => {
    const [playerName, setPlayerName] = useState();
    const [players, setPlayers] = useState([]);
    const {player} = usePlayer();
    const location = useLocation()
    const event = location.state.event
    const invited = event.invites
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
        console.log(players)
        setPlayers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch events');
        }
    };
    fetchPlayers();
    }, [playerName]);


  return (
    <>
    <div>InvitePlayer</div>
    {console.log(invited)}
    <form onSubmit={() => handleSubmit()}>
        <input 
        type="playername"
        name="playername"
        placeholder="playername"
        value={playerName}
        onChange={handleChange}
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
    </form>
    {players.length > 0&&
        <>
            {players.map((invitee) =>(
                player.id == invitee.id
                ?
                <></>
                :
                invited.filter((iplayer) => (iplayer.id == invitee.id)).length > 0
                ?
                    <PlayerBadge invitee={invitee} event={event} status={ 'invited' }/>
                :
                playing.filter((pplayer) => (pplayer.player_id == invitee.id)).length > 0
                ?
                    <PlayerBadge invitee={invitee} event={event} status={ 'playing' }/>
                :
                    <PlayerBadge invitee={invitee} event={event} status={ 'invite' }/> 
            ))}
        </>
    }
    </>
  )
}

export default InvitePlayer