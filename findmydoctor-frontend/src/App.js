import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/User/SignupPage/Signup';
import Login from './pages/User/LoginPage/Login';
import Home from './pages/User/HomePage/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProfileVerificationForm from './pages/Doctor/ProfileVarificatonForm/ProfileVarificationForm';
import DocumentVerificationForm from './pages/Doctor/DocumentVarification.js/DocumentVarificationForm';
import DoctorSignup from './pages/Doctor/Signup/DoctorSignup';
import DoctorLogin from './pages/Doctor/LoginPage/DoctorLogin';
import DoctorDashboard from './pages/Doctor/Dashboard/DoctorDashboard'
import Dashboard from './pages/Admin/Dashboard/Dashboard'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<PrivateRoute> <Home/> </PrivateRoute>} />
          <Route path="/doctorsignup" element={<DoctorSignup/>} />
          <Route path="/doctorlogin" element={<DoctorLogin/>} />
          <Route path='/doctordashboard' element={<DoctorDashboard/>}/>
          <Route path="/profilevarification" element={<ProfileVerificationForm/>} />
          <Route path="/documentvarification" element={<DocumentVerificationForm/>} />
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
