import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtClaims } from '../api/Interfaces';

export default function decodeJwtToken(jwtToken: string): JwtClaims | null {
  try {
    const decoded = jwt.verify(jwtToken, 'your-secret-key') as JwtPayload;
    // Assuming 'your-secret-key' should be the same key used for token generation
    return decoded as JwtClaims;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
