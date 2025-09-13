// lib/password.ts
import bcrypt from "bcryptjs";

export function hashPassword(plain: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plain, salt);
}

export function verifyPassword(plain: string, hashed: string) {
  return bcrypt.compareSync(plain, hashed);
}
