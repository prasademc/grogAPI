import * as express from "express";

const requestLoggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  res.on("finish", () => {
    const elasped = new Date().getTime() - start;
    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${elasped}ms`
    );
  });
  next();
};

export { requestLoggerMiddleware };
