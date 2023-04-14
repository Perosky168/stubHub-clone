import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateREquest, BadRequestError } from "@sgstubhub/common";

import { User } from "../models/user";
import { Password } from "../services/password";


const router = express.Router();

router.post("/api/users/signin",
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password field cannot be empty')
  ],
  validateREquest,
 async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('invalid credentials');
    }

    // generate jsonwebtoke
    const useJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // store it on session object

    req.session = {
      jwt: useJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
