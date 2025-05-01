/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import winston from "winston";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  // Log the error
  winston.error(message, err);

  // Prisma specific error handling
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = 'Validation Error';
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      message = "Duplicate Key error";
      error = err.meta;
    }
  }

  res.status(statusCode).json({
    success,
    message,
    error
  });
};

export default globalErrorHandler;
