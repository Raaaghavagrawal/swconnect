import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientLoginRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/signup', { state: { role: 'User', mode: 'login' }, replace: true });
  }, [navigate]);
  return null;
}

