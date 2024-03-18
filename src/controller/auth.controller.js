import bcryptjs from "bcryptjs";
import { prisma } from "../lib/dbConnector.js";
import { createHash } from "crypto";
import { generateToken } from "../lib/tokenGenerator.js";

export * as authController from "./auth.controller.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUsers = await prisma.user.findFirst({
      where: { email: email },
    });

    if (email && password) {
      if (existingUsers) {
        return res.status(400).json({
          status: 400,
          message: "Email sudah terpakai.",
        });
      } else {
        const saltRounds = 12;
        const hashPassword = await bcryptjs.hash(password, saltRounds);

        await prisma.user.create({
          data: {
            email: email,
            password: hashPassword,
          },
        });

        res.status(201).json({ success: true });
      }
    } else {
      res
        .status(400)
        .json({ success: false, msg: "Payload need Email & Password" });
    }
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Pengguna tidak ditemukan",
      });
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(422).json({
        status: 422,
        message: "Password salah!",
      });
    } else {
      const access_token = generateToken({ id: user.id });
      const refresh_token = generateToken({ id: user.id }, false);
      const md5Refresh = createHash("md5").update(refresh_token).digest("hex");

      await prisma.refresh_token.create({
        data: {
          userId: user.id,
          token: md5Refresh,
        },
      });

      res.json({
        status: 200,
        userId: user.id,
        access_token,
        refresh_token,
      });
    }
  } catch (error) {
    next(error);
  }
};
