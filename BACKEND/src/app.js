import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// router immport 
import userRouter from "./routes/user.routes.js";

// router decleartion

app.use('api/v1/users', userRouter)


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended:true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app }