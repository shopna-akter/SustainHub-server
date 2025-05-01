import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    userId?: string;
    role?: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: unknown) => {
    if (err) {
      res.status(403).json({ error: 'Failed to authenticate token' });
      return;
    }

    const { id, role } = decoded as { id: string; role: string };
    req.userId = id;
    req.role = role;

    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== 'ADMIN') {
    res.status(403).json({ error: 'You do not have admin rights' });
    return;
  }
  next();
};

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== role) {
      return res.status(403).json({ error: `You do not have ${role} rights` });
    }
    next();
  };
};