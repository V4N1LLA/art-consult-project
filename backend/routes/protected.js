// routes/protected.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth'); // 미들웨어 가져오기

// 보호된 라우트
router.get('/dashboard', auth, (req, res) => {
  res.json({
    msg: '접근이 허용된 보호된 대시보드',
    user: req.user, // 인증된 사용자 정보
  });
});

module.exports = router;
