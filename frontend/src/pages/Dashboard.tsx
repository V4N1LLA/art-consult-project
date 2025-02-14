// Dashboard.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그인하지 않은 경우 로그인 페이지로 리디렉트
  if (!auth?.user) {
    navigate('/login');
    return null; // 로그인하지 않으면 대시보드가 보이지 않게 함
  }

  return (
    <div>
      <h1>대시보드</h1>
      <p>환영합니다, {auth.user.email}님!</p>
      <button onClick={() => auth.logout()}>로그아웃</button>
    </div>
  );
};

export default Dashboard;