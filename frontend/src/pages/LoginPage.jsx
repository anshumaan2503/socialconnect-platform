import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <LoginForm onNavigateToRegister={() => navigate('/register')} />
    </div>
  );
};

export default LoginPage;
