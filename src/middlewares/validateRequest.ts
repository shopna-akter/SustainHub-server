import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
    });
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      const error = {
        message: err.errors?.[0]?.message || 'Invalid request data',
        details: err.errors || null,
      };
      res.status(400).json({ success: false, error });
    } else {
      next(err);
    }
  }
};

export default validateRequest;
