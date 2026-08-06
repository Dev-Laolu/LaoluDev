// Admin credentials — all values sourced from .env file (no hardcoded secrets)
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL.toLowerCase().trim();
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const TOKEN_KEY = "laolu_admin_session";

export const loginAdmin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = "admin_auth_token_" + Date.now();
        localStorage.setItem(TOKEN_KEY, token);
        resolve({ success: true, user: { email: ADMIN_EMAIL, role: "admin" } });
      } else {
        reject(new Error("Invalid email or password. Access denied."));
      }
    }, 400);
  });
};

export const logoutAdmin = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticatedAdmin = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return Boolean(token);
};
