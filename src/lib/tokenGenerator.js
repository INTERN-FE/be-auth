import { header } from "express-validator";
import jwt from "jsonwebtoken";

export const generateToken = (data, access = true) => {
  try {
    const secret = access
      ? "dosiajdoihasolfhokwehyfoklur23y39r37u20ik32"
      : "okdpokwpekerpwkeporkopeokpreprer";
    const expiry = access ? "120" : "90";

    if (!secret) {
      throw new Error("Token secret is not configured.");
    }

    return jwt.sign(data, secret, { expiresIn: parseInt(expiry) });
  } catch (error) {
    throw new Error(`Token generation error: ${error.message}`);
  }
};

export const verifyToken = (token, access = true) => {
  try {
    const secret = access
      ? "dosiajdoihasolfhokwehyfoklur23y39r37u20ik32"
      : "okdpokwpekerpwkeporkopeokpreprer";

    if (!secret) {
      throw new Error("Token secret is not configured.");
    }

    return jwt.verify(token, secret);
  } catch (error) {
    return {
      status: 401,
      message: `Unauthorized: ${error.message}`,
    };
  }
};

export const tokenValidation = (isRefresh = false) => {
  let refreshText = isRefresh ? "Refresh" : "Authorization";

  return [
    header("Authorization", `Please provide your ${refreshText} token`)
      .exists()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
          throw new Error(`Invalid ${refreshText} token`);
        }
        if (isRefresh) {
          req.headers.refresh_token = value.split(" ")[1];
          return true;
        }
        req.headers.access_token = value.split(" ")[1];
        return true;
      }),
  ];
};
