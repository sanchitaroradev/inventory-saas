import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
