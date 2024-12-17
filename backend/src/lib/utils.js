import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  console.log('Generated Token:', token);  // Log the generated token to confirm it's created

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: 'strict', // CSRF protection
    secure: process.env.NODE_ENV === 'development', // Set to true for production
  });

  return token; // Returning for logging purposes
};
