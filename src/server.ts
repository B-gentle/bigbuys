import express, { Response } from "express";
import connectDB from "./config/db";
import { logger, requestLogger } from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./utils/swagger";
import cors from "cors";
import { env } from "./commons/env";
const PORT = env.PORT || 5000;
import userRoutes from "./routes/userRoutes"
import foodRoutes from "./routes/foodRoutes"
import cookieParser from "cookie-parser";
import path from "path";

connectDB();
const app = express();

// middlewares
app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

// routes
app.use("/api/users", userRoutes);
app.use("/api/food", foodRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/", (_, res: Response) => {
  res.send("Buy at bigbuys!");
});

// error handlers
app.use((req, _res, next) => {
  logger.warn(
    {
      event: "route_not_found",
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      headers: {
        host: req.headers.host,
        referer: req.headers.referer,
        "user-agent": req.headers["user-agent"],
      },
    },
    "Route not found"
  );
  const err = new Error("Not Found");
  (err as any).statusCode = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
