import React from 'react'
import { useLocation } from 'react-router-dom'
import EventBadge from '../components/EventBadge'

const MyInvites = () => {
    const location = useLocation()
    const invites = location.state.invites
  return (
    <>
    {console.log(invites)}
    <div>MyInvites</div>
    {invites?.map((invite) => (
        <EventBadge event={invite} invite={true}/>
    ))}
    </>
  )
}

export default MyInvites