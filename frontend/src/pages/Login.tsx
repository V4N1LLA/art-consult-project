import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // 이미 로그인된 상태이면, 로그인 페이지에 머무르지 않음.
  useEffect(() => {
    if (auth?.user) {
      navigate('/dashboard');
    }
  }, [auth?.user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      // 로그인 API 응답에서 token과 user가 반환된다고 가정
      auth?.login(response.data.token, response.data.user);
      alert('로그인 성공');
      // navigate('/dashboard')는 AuthContext.login 내부에서 호출됨
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  // 회원가입 페이지로 이동하는 버튼
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <button onClick={goToRegister}>회원가입</button>
    </div>
  );
};

export default Login;