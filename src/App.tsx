import './mainStyle.css'
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './teacher/Teacher';
import Room from './room/Room';
import NotFound from './components/NotFound'
import Reservation from './reservation/Reservation';
import Login from './authentication/Login';
import SignUp from './authentication/Signup';
import AuthWrapper from './utils/AuthWrapper';

const App: React.FC = () => {
  return (
    <Router>  
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/teacher" element={<AuthWrapper><Teacher /></AuthWrapper>} />
        <Route path="/room" element={<AuthWrapper><Room /></AuthWrapper>} />
        <Route path="/reservations" element={<AuthWrapper><Reservation /></AuthWrapper>} />
        {/* Add a catch-all route for any undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
