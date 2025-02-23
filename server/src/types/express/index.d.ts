import { JwtPayload } from '../../../middleware/auth.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;  // Use the JwtPayload type for the user object
    }
  }
}
