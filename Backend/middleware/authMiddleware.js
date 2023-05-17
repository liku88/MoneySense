const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization').replace('Bearer ', '');

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};
