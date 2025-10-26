import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

export async function register(email, password, repeatPassword) {
  // Validation
  if (!email || email.length < 10) {
    throw new Error("Email should be at least 10 characters long");
  }
  if (!password || password.length < 4) {
    throw new Error("Password should be at least 4 characters long");
  }
  if (password !== repeatPassword) {
    throw new Error("Password missmatch!");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email already exists!");
  }

  const createdUser = await User.create({ email, password });
  const token = generateAuthToken(createdUser);
  return token;
}

export async function login(email, password) {
  // Validation
  if (!email || email.length < 10) {
    throw new Error("Email should be at least 10 characters long");
  }
  if (!password || password.length < 4) {
    throw new Error("Password should be at least 4 characters long");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }

  const token = generateAuthToken(user);
  return token;
}
