import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar2 from './components/NavBar2/NavBar2';
import Login from './components/Login';
import Register from './views/Register';
import Home from './components/Home';
import Events from './views/Events/Events';
import EventForm from './views/EventForm';
import EventDetails from './views/EventDetails/EventDetails';
import InvitePlayer from './views/InvitePlayer/InvitePlayer';
import MyInvites from './views/MyInvites/MyInvites';
import EditScore from './views/EditScore/EditScore';


function App() {
 

  

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path='/events/show' element={<Events/>}/>
            <Route path="/event-form" element={<EventForm/>}/>
            <Route path="/event-details" element={<EventDetails/>}/>
            <Route path="/invite-player" element={<InvitePlayer/>}/>
            <Route path="/my-invites" element={<MyInvites/>}/>
            <Route path="/edit-score" element={<EditScore/>}/>
          </Routes>
        </div>
        
      </div>
      <NavBar2/>
    </Router>
  );
}

export default App;
