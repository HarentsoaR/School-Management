import './mainStyle.css'
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teacher from './teacher/Teacher';
import Room from './room/Room';
import NotFound from './components/NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/room" element={<Room />} />
        {/* Add a catch-all route for any undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
