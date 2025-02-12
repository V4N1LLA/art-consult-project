// backend/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 회원가입 함수
exports.register = async (req, res) => {
  try {
    // 요청의 body에서 username, email, password 가져오기
    const { username, email, password } = req.body;

    // 이메일이 이미 존재하는지 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 새 사용자 생성
    const user = new User({ username, email, password });
    await user.save();

    // JWT 토큰 생성 (토큰에 사용자 id를 포함)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 로그인 함수
exports.login = async (req, res) => {
  try {
    // 요청 body에서 email과 password 가져오기
    const { email, password } = req.body;

    // 해당 이메일의 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 비밀번호 비교 (User 모델에서 정의한 comparePassword 메서드 사용)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
