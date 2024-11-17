import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

// Turso için ürün tablosu şeması
export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  stock: integer("stock").notNull(),
  imageUrl: text("imageUrl"), // Adding imageUrl field
});
