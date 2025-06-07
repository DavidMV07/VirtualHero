import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'admin' }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 