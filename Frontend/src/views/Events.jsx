import { useState, useEffect } from 'react';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import EventBadge from '../components/EventBadge';
import InviteBadge from '../components/InviteBadge';

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
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <InviteBadge/>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className="space-y-2">
          {events?.map((event) => (
            <EventBadge key={event.id} event={event} />
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/event-form')}>Add Event</button>
    </div>
  );
};

export default Events;