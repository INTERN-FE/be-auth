import express from "express";
import cors from "cors";

import { router as authRouter } from "./routers/auth.route.js";

const port = process.env.PORT ?? 2322;
const app = express();
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
