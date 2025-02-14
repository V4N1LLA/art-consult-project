const jwt = require('jsonwebtoken');

// JWT 인증 미들웨어
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: '인증 토큰이 없습니다.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 토큰에서 가져온 사용자 정보
    next(); // 다음 미들웨어로 넘어갑니다.
  } catch (err) {
    res.status(401).json({ msg: '토큰이 유효하지 않습니다.' });
  }
};
