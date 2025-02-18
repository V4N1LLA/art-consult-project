// frontend/src/pages/Dashboard.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
  };

  const goToEditProfile = () => {
    navigate('/edit-profile');
  };

  if (!auth?.user) {
    return null;
  }

  return (
    <div>
      <h1>대시보드</h1>
      <p>환영합니다, {auth.user.username}님!</p>
      <button onClick={goToEditProfile}>정보 수정</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Dashboard;