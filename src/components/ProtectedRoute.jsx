import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * requireRole="ADMIN"  -> only an ADMIN token gets through, everyone else
 *                         (including a logged-in customer) is redirected home.
 * no requireRole prop  -> any logged-in user (customer or admin) gets through.
 *
 * This is the frontend half of route protection — the backend enforces the
 * same rules independently (see SecurityConfig), so hiding a link here is
 * a UX nicety, not the actual security boundary.
 */
export default function ProtectedRoute({ children, requireRole }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole === 'ADMIN' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
