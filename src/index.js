import express from "express";

import { router as authRouter } from "./routers/auth.route";

const port = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;