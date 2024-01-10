import jwt from "jsonwebtoken";
import { createToken } from "../utils/createToken.js";

// user login
export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const { ADMIN_ID, ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD } =
      process.env;

    const isAdmin =
      username === ADMIN_USERNAME &&
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD;

    if (!isAdmin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createToken("accessToken", ADMIN_ID);
    const refreshToken = createToken("refreshToken", ADMIN_ID);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: parseInt(process.env.MAX_AGE, 10),
    });

    res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    next(error);
  }
};

// user logout

export const logout = async (req, res, next) => {
  try {
    if (!req.cookies.refresh_token) {
      return res.status(400).json({ message: "Cookie not found" });
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

// refresh access token
export const refresh = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken)
      return res.status(404).json({ message: "Refresh Token doesnt exist" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      const accessToken = createToken("accessToken", process.env.ADMIN_ID);

      return res
        .status(200)
        .json({ message: "Refresh successful", accessToken });
    });
  } catch (error) {
    next(error);
  }
};
