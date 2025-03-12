import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'
import './styles.css'

function EditForm({ handleSubmit, formData, setFormData } ) {
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return (
    <>
    
    <form onSubmit={handleSubmit} className="my-form">
    <h1>Register</h1>
      <TextField
        required
        id="outlined-basic"
        label="Username"
        variant="outlined"
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="field"
      />
      <TextField
        required
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
        required
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
      
      <Button variant="contained" type="submit" className="my-button">Register</Button>
    </form>
    </>
  );
}

export default EditForm;