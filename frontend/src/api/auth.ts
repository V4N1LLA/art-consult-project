import axios from 'axios';

const API_URL = 'http://localhost:5000'; // 백엔드 서버 주소

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
