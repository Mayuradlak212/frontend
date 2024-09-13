import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../common/Navbar'; // Import the Navbar component
import Batch from '../components/Batch';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Result from '../pages/Result';
import UserProfile from '../pages/Profile';
import NotesPage from '../pages/Notes';
import AssignmentsPage from '../pages/Assignment';
import TechnologyPage from '../pages/Technology';
import UserList from '../pages/Admin';
import Test from '../components/Test';
import Dashboard from '../pages/Dashboard';
import SourceCode from '../components/SourceCode';
import Code from '../pages/Code';
// import Notes from './pages/Notes';
// import Result from './pages/Result';
// import Assignment from './pages/Assignment';
// import Technology from './pages/Technology';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar is visible on all pages */}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/result" element={<Result />} />
          <Route path="/source-code" element={<Code />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin" element={<UserList />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
