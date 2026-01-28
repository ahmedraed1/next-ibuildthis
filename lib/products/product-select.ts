"use cache";

import { db } from "@/db";
import { products, votes } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserVotes(userId: string) {
  const userVotes = await db
    .select({ productId: votes.productId })
    .from(votes)
    .where(eq(votes.userId, userId));

  return userVotes.map((v) => v.productId);
}
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

export async function getProductById(id: number) {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return product[0] || null;
}

export async function getAdminProducts() {
  const productsData = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  return productsData;
}