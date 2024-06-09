import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();

export const handleNewUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !password || !username)
    return res
      .status(400)
      .json({ message: "Email, username and password are required." });

  const duplicate = await User.findOne({ email }).lean().exec(); //exec is necessary if we're using async/await with findOne()

  if (duplicate) return res.status(409).json({ message: "Duplicate e-mail" });

  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { email, username, password: hashedPwd };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }

  //Create and store the new user
  /* const result = await User.create({
      email: email,
      username: username,
      password: hashedPwd,
    }); */

  //Another way of creating a user and saving them in the database
  /* const newUser = new User()
    newUser.email = email
    newUser.username = username
    newUser.password = password
    const result = await newUser.save() */

  //Another way of creating a user and saving them in the database
  /* const newUser = new User({
      "email": email,
      "username": username,
      "password": hashedPwd,
      //createdAt: currentDate,
    });
    const result = await newUser.save() */
});

export const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "E-mail and password are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // Saving refreshToken with current user
  /* foundUser.refreshToken = refreshToken;
  const result = await foundUser.save(); */

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, username: foundUser.username });
});

export const handleRefresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken, username: foundUser.username });
    })
  );
});

export const handleLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "Cookie cleared" });
});
