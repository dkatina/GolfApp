import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { usePlayer } from '../../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import EventBadge from '../../components/EventBadge';
import InviteBadge from '../../components/InviteBadge';
import {motion} from 'framer-motion'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./styles.css"
import AddIcon from '@mui/icons-material/Add';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const {player} = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = player.token;
      if (!token) {
        setError('No authentication token found');
        return;
      }

      try {
        const response = await api.get('/events/my-events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch events');
      }
    };

    fetchEvents();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <header className="page-header events-header">
        <h1>My Events</h1>
        <div className='events-actions'>
        <AddIcon sx={{fontSize: 30}} onClick={() => navigate('/event-form')}/>
        <InviteBadge/>
        </div>
      </header>
      
      
      {events.length === 0 ? (
        <p className='no-events'>No events found</p>
      ) : (
        <div className='scroll-box'>
          {events?.map((event, index) => (
            <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventBadge key={event.id} event={event} />
            </motion.div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Events;