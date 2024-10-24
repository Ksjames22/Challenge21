const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware for extracting user from token
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.headers.authorization
    let token = req.headers.authorization || '';

    // Remove 'Bearer' prefix if it exists
    if (token.startsWith('Bearer ')) {
      token = token.split(' ').pop().trim();
    }

    // If no token, return null
    if (!token) {
      return null; // No token, return null user
    }

    // Verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data; // Return user data for context
    } catch (err) {
      console.log('Invalid token:', err);
      return null; // Invalid token, return null user
    }
  },

  // Function to sign a token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

