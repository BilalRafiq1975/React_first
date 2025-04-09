import { Navigate } from 'react-router-dom';
import { jwtVerify } from 'jose';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const SECRET_KEY = 'abcd';

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(SECRET_KEY);
    jwtVerify(token, secret);  // Will throw error if token is invalid or expired
    // If verification passes, render the protected content
    return children;
  } catch (err) {
    console.error('Token verification failed:', err);
    // Invalid or expired token, clear local storage and redirect to login
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
