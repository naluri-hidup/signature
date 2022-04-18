import express from "express";
import cors from "cors";
import Utils from "./utils";
import getConfig from "./config";
const app = express();

(async function main() {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.post("/", Utils.validateSignature, async (_req: any, res) => {
    try {
      res.send(
        "If you received this, it means everything went according to plan!"
      );
    } catch (err) {
      console.log(err);
    }
  });

  app
    .listen(getConfig().PORT, () => {
      console.log(`App listening at port: ` + getConfig().PORT);
    })
    .on("error", (e) => {
      console.log("Error happened: ", e.message);
    });
})();

process.on("uncaughtException", async (error) => {
  console.log("uncaughtException", error);
});
