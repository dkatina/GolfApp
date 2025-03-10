import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate, Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

export default function NavBar2() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { player, setPlayer } = usePlayer();

  const handleLogout = (e) =>{
    e.preventDefault()
    navigate('/')
    setPlayer({})
    

  }

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
     
        <BottomNavigationAction onClick={()=>navigate('/')}label="Home" icon={<RestoreIcon />} />
       
        {!player.hasOwnProperty('name')&&
            <BottomNavigationAction onClick={()=>navigate('/login')} label="Login" icon={<FavoriteIcon />}/>
        }
        {!player.hasOwnProperty('name')&&
        
            <BottomNavigationAction onClick={()=>navigate('/register')} label="Register" icon={<FavoriteIcon />}/>

        }
         {player.hasOwnProperty('name')&&
          
            <BottomNavigationAction onClick={()=>navigate('/events/show')} label="Events" icon={<FavoriteIcon />}/>
     
        }
         {player.hasOwnProperty('name')&&
     
            <BottomNavigationAction onClick={(e)=>handleLogout(e)} label="Logout" icon={<FavoriteIcon />}/>
  
        }
      </BottomNavigation>
    </Box>
  );
}