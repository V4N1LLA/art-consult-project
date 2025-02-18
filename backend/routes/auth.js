const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // User 모델 import
const authMiddleware = require('../middlewares/authMiddleware'); // 인증 미들웨어
const router = express.Router();

// 로그인 라우트: POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password); // 비밀번호 비교
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // JWT 토큰 생성 (유효기간 1일)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 회원가입 라우트: POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 이메일 중복 확인
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password, // 비밀번호는 User 모델의 'pre' 훅에서 해싱됩니다.
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 사용자 정보 수정: PUT /api/auth/user
router.put('/user', authMiddleware, async (req, res) => {
  const { username, email } = req.body;

  try {
    // 이메일 중복 체크
    const userExist = await User.findOne({ email });
    if (userExist && userExist.email !== req.user.email) {
      return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
    }

    // 사용자 정보 수정
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true }  // 수정된 정보를 반환
    );

    if (!updatedUser) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '사용자 정보가 업데이트되었습니다.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 사용자 정보 가져오기: GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 로그아웃 라우트 (클라이언트에서 처리)
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;