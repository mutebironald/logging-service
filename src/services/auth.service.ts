import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/user.entity';
import { hashPassword, comparePasswords } from '../utils/hash.util';

type RegistrationRequest = {
  email: string;
  password: string;
};

type AuthenticationRequest = {
  email: string;
  password: string;
};

export class AuthService {
  static async registerUser({ email, password }: RegistrationRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = userRepository.create({ email, password: hashedPassword, role: UserRole.User });

    await userRepository.save(newUser);
    return { message: 'User registered successfully' };
  }

  static async authenticateUser({ email, password }: AuthenticationRequest) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.email, user.role as UserRole);

    return { message: 'User authenticated successfully', token };
  }

  // Helper method to generate JWT token
  private static generateToken(userId: number, email: string, role: UserRole) {
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    return jwt.sign(
      { id: userId, email, role }, // Payload data
      JWT_SECRET as string,
      { expiresIn: JWT_EXPIRES_IN } // Token expiration
    );
  }
}
