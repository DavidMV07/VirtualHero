/**
 * @fileoverview Componente para proteger rutas basadas en roles de usuario
 * @module ProtectedRoute
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente que protege rutas basadas en roles de usuario
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si el usuario tiene acceso
 * @param {string} [props.requiredRole='admin'] - Rol requerido para acceder a la ruta
 * @returns {React.ReactElement} Renderiza los componentes hijos si el usuario tiene el rol requerido,
 * o redirige a la página principal si no tiene acceso
 * 
 * @example
 * // Proteger una ruta para administradores
 * <Route path="/admin" element={
 *   <ProtectedRoute>
 *     <AdminPanel />
 *   </ProtectedRoute>
 * } />
 * 
 * @example
 * // Proteger una ruta para un rol específico
 * <ProtectedRoute requiredRole="editor">
 *   <EditorDashboard />
 * </ProtectedRoute>
 */
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