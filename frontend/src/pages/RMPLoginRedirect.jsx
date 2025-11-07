import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RMPLoginRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/signup', { state: { role: 'RMP', mode: 'login' }, replace: true });
  }, [navigate]);
  return null;
}

