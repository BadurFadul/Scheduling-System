// ./Components/ProtectedRoute.js
import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ user, ...props }) {
  return user ? <Route {...props} /> : <Navigate to="/login" />;
}

export default ProtectedRoute;