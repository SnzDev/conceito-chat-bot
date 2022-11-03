import { Request, Response, NextFunction } from "express";

function handleError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof Error)
    return response.status(400).json({
      status: 400,
      message: err.message,
    });

  return response.status(500).json({
    status: 500,
    message: `Internal server error - ${err}`,
  });
}

export { handleError };
