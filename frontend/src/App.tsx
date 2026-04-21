import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Signup from './pages/Signup';
import Sales from './pages/Sales';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element= {<Signup />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sales />} />

      </Routes>
    </>
  );
}

export default App;
