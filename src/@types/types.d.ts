// declare namespace Express {
//   export interface Request {
//     user?: {
//       userId: number;
//       email: string;
//       role: 'admin' | 'user';
//     };
//   }
// }

import { JwtPayload } from "jsonwebtoken";
import { User } from "../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Define the custom property on the Request object
    }
  }
}
