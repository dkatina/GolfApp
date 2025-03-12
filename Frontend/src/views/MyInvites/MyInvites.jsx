import React from 'react'
import { useLocation } from 'react-router-dom'
import EventBadge from '../../components/EventBadge'
import './MyInvites.css'

const MyInvites = () => {
    const location = useLocation()
    const invites = location.state.invites
  return (
    <>
    <div className='my-invites-header'>
      <h1>My Invites</h1>
    </div>
    <div className='my-invites-body'>
    {invites?.map((invite) => (
        <EventBadge key={invite.id} event={invite} invite={true}/>
    ))}
    </div>
    </>
  )
}

export default MyInvites