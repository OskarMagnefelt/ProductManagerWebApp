import jwt_decode from 'jwt-decode';
import { JwtClaims } from '../api/Interfaces';

export default function decodeJwtToken(jwtToken: string): JwtClaims | null {
  try {
    const decoded = jwt_decode(jwtToken) as JwtClaims;
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
