import dotenv from "dotenv";
import dbConnect from "./db/index.js";

import { app } from "./app.js";

dotenv.config({
  path: "./env",
});



dbConnect()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`connection successfully on port no ${process.env.PORT}`);
    });
    return server;
  })
  .catch((err) => {
    console.log(`Mongodb connection faild`, err);
  });

