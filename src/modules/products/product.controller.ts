import { Request, Response, NextFunction } from "express";
import { getProducts } from "./product.service";

export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getProducts(req.query);
    const response = { count: data.length, data };
    res.json(response);
    return response; // 
  } catch (err) {
    next(err);
  }
};
