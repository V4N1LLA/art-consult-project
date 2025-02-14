const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: '인증 토큰이 필요합니다.' });
  }

  try {
    // JWT 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // 토큰 검증
    req.user = decoded;  // 인증된 사용자 정보 추가
    next();  // 인증이 성공하면 다음 미들웨어로 넘어갑니다.
  } catch (err) {
    return res.status(401).json({ msg: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = authMiddleware;
