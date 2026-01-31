let totalRequests = 0;
let productRequests = 0;

export const metricsMiddleware = (req: any, _res: any, next: any) => {
  totalRequests++;
  if (req.path.startsWith("/products")) productRequests++;
  next();
};

export const getMetrics = () => ({
  uptime: process.uptime(),
  totalRequests,
  productRequests,
  memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
});
