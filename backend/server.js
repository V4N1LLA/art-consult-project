// backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결 (옵션 제거 가능)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// 인증 라우터 불러오기 및 연결
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Art Consult API가 실행 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
