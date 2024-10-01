import { Request, Response } from 'express';
import { LogService } from '../services/log.service';
import { User } from '../entities/user.entity';

export class LogController {
  static async sendLogs(req: Request, res: Response): Promise<void> {
    // console.log(req)
    try {
      if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }
      
      const user: User = req.user as User; // `req.user` is set by the authentication middleware
      const logs = req.body;

      if (!Array.isArray(logs)) {
        res.status(400).json({ message: 'Invalid request format' });
        return;
      }
      const result = await LogService.saveLogs(user, logs);
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  static async getReport(req: Request, res: Response) {
    try {
      const user: User = req.user as User;
      const { startDate, endDate } = req.body;
      const result = await LogService.generateReport(user, { startDate, endDate });

      res.status(200).json(result);
      return;
    } catch (error) {
        // Type assertion to check if the error is an instance of Error
        if (error instanceof Error) {
          if (error.message === 'Unauthorized to access report generation') {
              // Return 403 Forbidden for unauthorized access
              res.status(403).json({ message: error.message });
          }else if(error.message === 'Both startDate and endDate must be provided') {
            res.status(400).json({ message: error.message });
          }else if(error.message === 'endDate must be greater than startDate') {
            res.status(400).json({ message: error.message });
          }else {
              console.log(error);
              res.status(500).json({ message: 'Internal server error' });
          }
      } else {
          // Handle unexpected error types
          console.log('Unexpected error:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
      return;
    }
  }
}
