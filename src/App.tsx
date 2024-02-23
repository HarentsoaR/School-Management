import './mainStyle.css'
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './teacher/Teacher';
import Room from './room/Room';
import NotFound from './components/NotFound'
import Reservation from './reservation/Reservation';
import Login from './authentication/Login';
import SignUp from './authentication/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/room" element={<Room />} />
        <Route path="/reservations" element={<Reservation />} />
        {/* Add a catch-all route for any undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
