import { useState } from 'react';
import api from '../api/axios';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import './EditForm/styles.css'


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const {player, setPlayer} = usePlayer();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/accounts/login', formData);
      alert(response.data.message)
      setPlayer({...response.data.player, "token": response.data.token});
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-form">
      <h1>Login</h1>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="field"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="field"
      />
      <Button type="submit" variant="contained" className="field">Login</Button>
    </form>
  );
}

export default Login;