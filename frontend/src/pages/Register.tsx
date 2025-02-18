import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // 회원가입 후 로그인 페이지로 리디렉션하기 위한 훅

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true); // 요청 시작 시 로딩 상태 true
    setError(null); // 에러 초기화

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      alert(response.data.message); // 성공 메시지 표시
      navigate('/login'); // 로그인 페이지로 리디렉션
    } catch (error: any) {
      setError(error.response?.data?.message || '회원가입 실패'); // 에러 메시지 처리
      console.error(error); // 오류 로그
    } finally {
      setIsLoading(false); // 요청 완료 후 로딩 상태 false
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? '회원가입 중...' : '회원가입'}
        </button>
      </form>

      {/* 에러 메시지 출력 */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Register;