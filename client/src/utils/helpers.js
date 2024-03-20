import decode from "jwt-decode";
import Auth from "./auth";

function getUserRole() {
  const token = Auth.getToken();
  if (!token) {
    return undefined;
  }

  if (Auth.isTokenExpired(token)) {
    return undefined;
  }

  const decoded = decode(token);
  if (!decoded || !decoded.data || !decoded.data.role) {
    return undefined;
  }

  return decoded.data.role;
}

export { getUserRole };
