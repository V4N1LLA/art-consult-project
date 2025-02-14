// routes/protectedRoute.js

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT 인증 미들웨어
const router = express.Router();

// 보호된 경로
router.get('/', authMiddleware, (req, res) => {
  res.json({
    msg: '이 경로는 인증된 사용자만 접근할 수 있습니다.',
    user: req.user // 토큰에서 추출한 사용자 정보
  });
});

module.exports = router;
