import * as decode from "jwt-decode";
class Auth {
  getProfile() {
    return decode.default(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode.default(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  getToken() {
    return this.getCookie("id_token");
  }

  login(idToken) {
    this.setCookie("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    try {
      this.deleteCookie("id_token");
      window.location.assign("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  // Helper functions for working with cookies
  setCookie(name, value, days = 1) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; secure; SameSite=Strict`;
  }

  getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  deleteCookie(name) {
    try {
      const expires = new Date(Date.now() - 86400000).toUTCString();
      document.cookie = `${name}=; expires=${expires}; path=/; secure; SameSite=Strict`;
    } catch (error) {
      console.error("Error deleting cookie:", error);
    }
  }
}

export default new Auth();
