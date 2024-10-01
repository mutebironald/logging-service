import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try{
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const result = await AuthService.registerUser({email, password});
      res.status(200).json(result);
      return;
    }catch(error){
      res.status(400).json({ message: (error as Error).message });
      return;
    }
  }


  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }
      const result = await AuthService.authenticateUser({ email, password });
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(401).json({ message: (error as Error).message });
      return;
    }
  }
}



