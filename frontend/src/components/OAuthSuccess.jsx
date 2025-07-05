import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const redirect = params.get('redirect');

    if (token) {
      localStorage.setItem('token', token);
      console.log('✅ JWT saved:', token);
      navigate(`/${redirect}`);
    } else {
      alert('OAuth login failed');
      navigate('/login');
    }
  }, [navigate]);

  return <p className="text-center mt-10 text-lg">Completing login...</p>;
};

export default OAuthSuccess;
