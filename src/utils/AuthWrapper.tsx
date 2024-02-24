import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Toast } from '../components/Toast';

const AuthWrapper = ({ children }) => {
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history('/');
      Toast.fire({
        icon: "error",
        title: "Please login first !"
      });
    } else {
      try {
        const decoded = jwtDecode(token);
        // Convert the expiration time to a JavaScript Date object
        const expirationDate = new Date(decoded.exp *  1000);
        // Check if the current time is past the expiration time
        if (Date.now() > expirationDate.getTime()) {
          // Token is expired
          // Remove the token from localStorage
          localStorage.removeItem('token');
          // Redirect to the root path
          history('/');
          Toast.fire({
            icon: "warning",
            title: "Session expired !"
          });
        }
      } catch (error) {
        console.log("Error while decoding token:", error);
      }
    }
  }, [history]);

  return children;
};

export default AuthWrapper;
