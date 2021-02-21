import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as swaggerUi from "swagger-ui-express";
import { requestLoggerMiddleware } from "./request.logger.middleware";
import "./beer/index";
import { RegisterRoutes } from "../docs/routes";

const grogApp = express();

grogApp.use(cors());
grogApp.use(bodyParser.json());
grogApp.use(requestLoggerMiddleware);

RegisterRoutes(grogApp);

try {
  const swaggerDocument = require("../docs/swagger.json");
  grogApp.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error("Unable to read swagger json", error);
}

export { grogApp };
