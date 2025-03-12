import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate, Link } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import './styles.css'

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
    <Box sx={{ width: 500 }} className='navStyle'>
      <BottomNavigation
        className='navButton'
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
     
        <BottomNavigationAction onClick={()=>navigate('/')}label="Home" icon={<HomeIcon />} className='navLinks'/>
       
        {!player.hasOwnProperty('name')&&
            <BottomNavigationAction onClick={()=>navigate('/login')} label="Login" icon={<LockOpenRoundedIcon/>} className='navLinks'/>
        }
        {!player.hasOwnProperty('name')&&
        
            <BottomNavigationAction onClick={()=>navigate('/register')} label="Register" icon={<AppRegistrationIcon />} className='navLinks'/>

        }
         {player.hasOwnProperty('name')&&
          
            <BottomNavigationAction onClick={()=>navigate('/events/show')} label="Events" icon={<EventIcon />} className='navLinks'/>
     
        }
         {player.hasOwnProperty('name')&&
     
            <BottomNavigationAction onClick={(e)=>handleLogout(e)} label="Logout" icon={<LogoutIcon />} className='navLinks'/>
  
        }
      </BottomNavigation>
    </Box>
  );
}