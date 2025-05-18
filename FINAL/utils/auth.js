// FINAL/utils/auth.js
import { users } from "../data";

export const authenticateUser = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};
