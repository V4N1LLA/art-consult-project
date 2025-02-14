const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // /api/auth/me 엔드포인트 처리

dotenv.config();  // .env 파일에서 환경 변수 로드

const app = express();
app.use(cors());
app.use(express.json());  // 요청 본문을 JSON으로 파싱

// 라우트 설정
app.use('/api/auth', authRoutes);  // 회원가입, 로그인 라우트
app.use('/api/auth', userRoutes);  // 사용자 정보 (예: /api/auth/me)

// DB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 실행 중입니다.`);
});
