import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

export async function register(email, password) {
  const createdUser = await User.create({ email, password });
  const token = generateAuthToken(createdUser);
  return token;
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalild email or password!");
  }

  const token = generateAuthToken(user);
  return token;
}
