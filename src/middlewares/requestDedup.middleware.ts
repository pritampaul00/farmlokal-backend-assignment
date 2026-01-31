import { Request, Response, NextFunction } from "express";

const pending = new Map<string, Promise<any>>();

export const deduplicate =
  (keyFn: (req: Request) => string, handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const key = keyFn(req);

    if (pending.has(key)) {
      try {
        const data = await pending.get(key);
        return res.json(data);
      } catch (err) {
        return next(err);
      }
    }

    const promise = (async () => {
      try {
        return await handler(req, res, next);
      } finally {
        pending.delete(key);
      }
    })();

    pending.set(key, promise);

    try {
      const result = await promise;
      return result;
    } catch (err) {
      return next(err);
    }
  };
