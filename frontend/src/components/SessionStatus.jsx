import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SessionStatus = () => {
  const { user } = useAuth();
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const updateSessionTime = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const now = new Date().getTime();
        const inactiveTime = Math.floor((now - parseInt(lastActivity)) / (1000 * 60));
        setSessionTime(inactiveTime);
      }
    };

    const interval = setInterval(updateSessionTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!user) return null;

  const getSessionColor = () => {
    if (sessionTime < 15) return 'success';
    if (sessionTime < 25) return 'warning';
    return 'danger';
  };

  const getSessionText = () => {
    if (sessionTime < 15) return 'Active';
    if (sessionTime < 25) return 'Idle Warning';
    return 'Inactive - Will logout soon';
  };

  return (
    <div 
      className="position-fixed top-0 end-0 p-2 text-white"
      style={{ 
        background: getSessionColor() === 'success' ? '#198754' : 
                   getSessionColor() === 'warning' ? '#FA8000' : '#dc3545',
        fontSize: '0.8rem',
        zIndex: 1000,
        borderRadius: '0 0 8px 8px'
      }}
    >
      <small>
        Session: {getSessionText()} ({sessionTime} min)
      </small>
    </div>
  );
};

export default SessionStatus;
