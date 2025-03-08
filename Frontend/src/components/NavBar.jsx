import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

function NavBar() {
  const navigate = useNavigate();
  const { player, setPlayer } = usePlayer();

  const handleLogout = (e) =>{
    e.preventDefault()
    navigate('/')
    setPlayer({})
    

  }

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        {!player.hasOwnProperty('name') ? 
        <>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        </>
        : 
        <>
        <li><Link to="/events/show">Events</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
        </>
        }
        
      </ul>
    </nav>
  );
}

export default NavBar;