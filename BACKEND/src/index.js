import dotenv from "dotenv";
import dbConnect from "./db/index.js";
// import fs from 'fs'
// import hls from 'hls-server'
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

//  new hls(server, {
//     provider: {
//       exists: (req, cb) => {
//         console.log(req.url);
//         console.log("Hello");
//         // const ext = req.url.split(".").pop();
//         // console.log(ext);
  
//         // if (ext !== "m3u8" && ext !== "ts") {
//         //   return cb(null, true);
//         // }
  
//         // fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
//         //   if (err) {
//         //     console.log("File not exist!");
//         //     return cb(null, false);
//         //   }
//         //   cb(null, true);
//         // });
//       },
//     //   getManifestStream: (req, cb) => {
//     //     const stream = fs.createReadStream(__dirname + req.url);
//     //     cb(null, stream);
//     //   },
//     //   getSegmentStream: (req, cb) => {
//     //     const stream = fs.createReadStream(__dirname + req.url);
//     //     cb(null, stream);
//     //   },
//     },
//   });

