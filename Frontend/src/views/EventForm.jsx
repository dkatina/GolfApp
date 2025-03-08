import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {player} = usePlayer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = player.token;
    if (!token) {
      setError('No authentication token found');
      return;
    }

    try {
      const response = await api.post('/events/', { "title": title }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/events/show');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;