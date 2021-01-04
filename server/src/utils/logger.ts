import expressWinston from "express-winston";
import winston from "winston";
// import config from "./config";

const transports: any[] = [];

transports.push(new winston.transports.Console());

export const logger = winston.createLogger({
  level: "info",
  transports,
  // format:
  //   config.get("NODE_ENV") !== "production"
  //     ? winston.format.simple()
  //     : undefined,
});

export const appLogger = () =>
  expressWinston.logger({
    winstonInstance: logger,
    level: "info",
    meta: true,
    // colorize: config.get("NODE_ENV") !== "production",
  });

export const appErrorLogger = () =>
  expressWinston.errorLogger({
    winstonInstance: logger,
    level: "info",
  });
