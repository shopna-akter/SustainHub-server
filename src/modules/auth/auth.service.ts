import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword, generateToken } from './auth.utils';

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (data: any) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('User already exists');

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashed,
      role: 'MEMBER',
    },
  });

  return {
    message: 'Registration successful',
    user: { id: user.id, email: user.email, role: user.role },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error('User not found');

  const valid = await comparePassword(data.password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
