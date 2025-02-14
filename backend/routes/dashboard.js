// backend/routes/dashboard.js

const express = require('express');
const router = express.Router();

// 대시보드 엔드포인트
router.get('/', (req, res) => {
  res.json({
    message: 'Dashboard data loaded successfully!',
    userCount: 120, // 예제 데이터
    recentUsers: ['Alice', 'Bob', 'Charlie'],
  });
});

module.exports = router;
