import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './views/Register';
import Home from './components/Home';
import Events from './views/Events';
import EventForm from './views/EventForm';
import EventDetails from './views/EventDetails';
import InvitePlayer from './views/InvitePlayer';


function App() {
 

  

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path='/events/show' element={<Events/>}/>
            <Route path="/event-form" element={<EventForm/>}/>
            <Route path="/event-details" element={<EventDetails/>}/>
            <Route path="/invite-player" element={<InvitePlayer/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
