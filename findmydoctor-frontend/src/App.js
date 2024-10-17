import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/SignupPage/Signup';
import Login from './pages/LoginPage/Login';
import Home from './pages/HomePage/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<PrivateRoute> <Home/> </PrivateRoute>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
