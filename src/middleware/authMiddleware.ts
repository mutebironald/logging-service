import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

interface JwtPayload {
  userId: number;
  email: string;
  role: 'admin' | 'user';
}

// Middleware to protect routes
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.body.authorization || req.query.authorization || req.headers.authorization?.split(' ')[1]; // Expecting `Bearer <token>`

  if (!token) {
    res.status(401).json({ message: 'Access Denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Continue to the next middleware/route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
    return;
  }
};

export default authMiddleware;
