import { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const getUserFromLS=()=>{
        let player =localStorage.getItem('current_player')
        if (player){
            return JSON.parse(player)
        }
    }

    const [player, _setPlayer] = useState(null);

    const setPlayer=(player)=>{
        localStorage.setItem('current_player', JSON.stringify(player))
        _setPlayer(player)
    }


    return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
        {children}
    </PlayerContext.Provider>
    );
}

export function usePlayer() {
  return useContext(PlayerContext);
}