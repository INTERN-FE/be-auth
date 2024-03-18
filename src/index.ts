import express from "express";

import { router as userRouter } from "./routers/user.route";
import swaggerUi from "swagger-ui-express";

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

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use("/static/public", express.static("./public/uploads/"));
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
