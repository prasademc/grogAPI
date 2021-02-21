import { grogApp } from "./index";
import * as http from "http";
import * as mongoose from "mongoose";
require("dotenv").config({ path: "./.env" });

const PORT = 8080;

const server = http.createServer(grogApp);
server.listen(PORT);

server.on("listening", async () => {
  console.log(`listening on PORT ${PORT}`);

  mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const connection = mongoose.connection;

  connection.on("open", () => {
    console.info("MongoDB database connection established successfully");
  });

  connection.on("error", (err: any) => {
    console.error(err);
  });
});
