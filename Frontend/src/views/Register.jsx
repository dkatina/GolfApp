import React from 'react'
import EditForm from '../components/EditForm/EditForm';
import api from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' ,username: ''});
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/accounts/', formData);
        alert(response.data.message)
        navigate('/login')
      };



  return (
    
    <EditForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}></EditForm>
  )
}

export default Register