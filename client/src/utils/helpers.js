import decode from 'jwt-decode';
import Auth from './auth';

function getUserRole() {
  const token = Auth.getToken();
  if (!token) {
    console.log('No token found');
    return undefined;
  }

  if (Auth.isTokenExpired(token)) {
    console.log('Token is expired');
    return undefined;
  }

  const decoded = decode(token);
  if (!decoded || !decoded.data || !decoded.data.role) {
    console.log('No role found in token');
    return undefined;
  }

  return decoded.data.role;
}

export { getUserRole };