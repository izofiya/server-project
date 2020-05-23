const { createLogger, format, transports } = require("winston");
const { printf } = format;
require("winston-daily-rotate-file");

const fs = require("fs");
const path = require("path");

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logFormatForFile = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
  logFormat
);

const logFormatForConsole = format.combine(
  format.colorize(),
  format.simple(),
  logFormat
);

const logger = createLogger({
  level: "info",
  format: logFormatForFile,
  transports: [
    new transports.DailyRotateFile({
      filename: path.join(logDir, "/designers-server-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "10m",
      maxFiles: "3d",
    }),
    new transports.Console({
      format: logFormatForConsole,
    }),
  ],
});

module.exports = logger;
