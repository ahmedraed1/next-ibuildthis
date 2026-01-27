import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
export async function getFeaturedProducts() {
    const productsData = await db.select().from(products).where(eq(products.status, 'approved')).orderBy(desc(products.voteCount)).limit(10);   
    return productsData;
}

export async function getAllApprovedProducts() {
  const productsData = await db
    .select()
    .from(products)
    .where(eq(products.status, "approved"))
    .orderBy(desc(products.voteCount));

  return productsData;
}

export async function getRecentlyLaunchedProducts() {
  const productsData = await getAllApprovedProducts();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return productsData.filter(
    (product) =>
      product.createdAt &&
      new Date(product.createdAt.toISOString()) >= oneWeekAgo
  );
}