import { Route, Routes } from 'react-router-dom';
import NavBar from './component/Navbar'; // Import the NavBar component
import StudentsPage from './pages/StudentPage'; // Page for students
import DepartmentsPage from './pages/DepartmentPage'; // Page for departments
// import SubjectsPage from './SubjectsPage'; // Page for subjects
// import TeachersPage from './TeachersPage'; // Page for teachers
import ResultsPage from './pages/ResultPage'; // Page for results
import FeesPage from './pages/FeesPage'; // Page for fees


import './App.css'
const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<StudentsPage />} />
         <Route path="/departments" element={<DepartmentsPage />} />
         <Route path="/results" element={<ResultsPage />} />
         <Route path="/fees" element={<FeesPage />} />  

         {/* <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
         */}
      </Routes>
    
    </>
    
  );
};

export default App;
