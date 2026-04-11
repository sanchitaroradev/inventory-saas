import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element= {<Login/>}/>
      <Route 
      path='/dashboard'
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      } 
      />
    </Routes>
    </>
  );
}

export default App;
