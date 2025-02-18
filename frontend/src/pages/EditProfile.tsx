// frontend/src/pages/EditProfile.tsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    throw new Error("AuthContext가 제공되지 않았습니다!"); // ✅ auth가 null이면 에러 발생
  }

  const { user, setUser } = auth; // 이제 에러 없이 사용 가능!

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUsername(response.data.username || '');
          setEmail(response.data.email || '');
        })
        .catch(error => {
          console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        'http://localhost:5000/api/auth/user',
        { username, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('사용자 정보가 업데이트되었습니다.');

      // ✅ AuthContext 즉시 업데이트
      setUser((prevUser: any) => ({
        ...prevUser,
        username,
      }));

      navigate('/dashboard'); // 대시보드로 이동
    } catch (error) {
      alert('정보 수정에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>사용자 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">정보 수정</button>
      </form>
    </div>
  );
};

export default EditProfile;