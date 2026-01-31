import { db } from "../../config/db";

export const findProducts = async (params: any) => {
  const {
    cursor = 0,
    limit = 20,
    sort = "createdAt",
    order = "DESC",
    category,
    minPrice,
    maxPrice,
    search,
  } = params;

  const allowedSortFields = ["price", "createdAt", "name"];
  const sortField = allowedSortFields.includes(sort) ? sort : "createdAt";
  const sortOrder = order === "ASC" ? "ASC" : "DESC";

  let where = "WHERE id > ?";
  const values: any[] = [Number(cursor)];

  if (category) {
    where += " AND category = ?";
    values.push(category);
  }

  if (minPrice) {
    where += " AND price >= ?";
    values.push(Number(minPrice));
  }

  if (maxPrice) {
    where += " AND price <= ?";
    values.push(Number(maxPrice));
  }

  if (search) {
    where += " AND MATCH(name, description) AGAINST (? IN BOOLEAN MODE)";
    values.push(search);
  }

  const [rows] = await db.query(
    `SELECT id, name, description, category, price, createdAt
     FROM products
     ${where}
     ORDER BY ${sortField} ${sortOrder}
     LIMIT ?`,
    [...values, Number(limit)]
  );

  return rows;
};
