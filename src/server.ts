import app from './app';
import prisma from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    await prisma.$disconnect();
    process.exit(1)
  }
};

main();