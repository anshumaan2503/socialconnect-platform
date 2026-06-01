import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-background antialiased">
      <RegisterForm onNavigateToLogin={() => navigate('/login')} />
    </div>
  );
};

export default RegisterPage;
