import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const redirect = params.get('redirect');

    if (!token) {
      alert('OAuth login failed');
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        localStorage.setItem('token', token);
        const res = await axios.get(`${backendURL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = res.data;
        localStorage.setItem('user', JSON.stringify({ ...user, token }));
        console.log('User saved:', user);

        navigate(`/${redirect}`);
      } catch (err) {
        console.error('Error fetching user:', err);
        alert('Failed to fetch user info. Please try again.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return <p className="text-center mt-10 text-lg">Completing login...</p>;
};

export default OAuthSuccess;
