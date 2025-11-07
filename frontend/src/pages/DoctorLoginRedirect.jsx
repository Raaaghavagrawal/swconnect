import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DoctorLoginRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/signup', { state: { role: 'Doctor', mode: 'login' }, replace: true });
  }, [navigate]);
  return null;
}

