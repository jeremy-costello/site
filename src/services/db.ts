// services/db.ts
import { PGlite, MemoryFS, IdbFs, type PGliteOptions } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import type { Article } from "../types";
import { initEmbedder, embedText } from "./embed";

let db: PGlite;

type LoadDBOptions =
  | { mode: "memory" }
  | { mode: "indexeddb"; name: string }
  | { mode: "url"; url: string }
  | { mode: "file"; file: File };

export async function loadDB(options: LoadDBOptions): Promise<PGlite> {
  if (db) return db;

  let config: PGliteOptions = {
    extensions: { vector },
  };

  switch (options.mode) {
    case "memory":
      config.fs = new MemoryFS();
      break;

    case "indexeddb":
      config.fs = new IdbFs(options.name);
      break;

    case "file":
      config.loadDataDir = options.file;
      break;

    case "url":
      const response = await fetch(options.url);
      const blob = await response.blob();
      config.loadDataDir = new File([blob], "database.db");
      break;
  }

  db = new PGlite(config);
  return db;
}

export function getDB(): PGlite {
  if (!db) throw new Error("Database not initialized. Call loadDB first.");
  return db;
}

export async function initDB(): Promise<void> {
  await db.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      category TEXT NOT NULL,
      embedding vector(768)
    );
  `);

  await db.query(`
    CREATE INDEX IF NOT EXISTS articles_embedding_hnsw_ip_idx
    ON articles USING hnsw (embedding vector_ip_ops)
    WITH (m = 16, ef_construction = 100);
  `);
}

// CLONING
interface ArticleRow {
  id: number;
  title: string;
  text: string;
  category: string;
  embedding: string;
}

export async function clonePgliteDatabase(
  originalDb: PGlite
): Promise<File | Blob> {
  // Step 1: Create a new PGlite instance with vector extension
  const newDb = await PGlite.create({
    extensions: { vector },
  });

  // Step 2: Recreate your schema in the new DB
  await newDb.query(`CREATE EXTENSION IF NOT EXISTS vector;`);

  await newDb.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      category TEXT NOT NULL,
      embedding vector(768)
    );
  `);

  // Step 3: Read all data from original DB
  const articles = await originalDb.query<ArticleRow>(`
    SELECT id, title, text, category, embedding FROM articles
  `);
  // Step 4: Insert rows into new DB
  for (const row of articles.rows) {
    await newDb.query(
      `INSERT INTO articles (id, title, text, category, embedding) VALUES ($1, $2, $3, $4, $5)`,
      [row.id, row.title, row.text, row.category, row.embedding]
    );
  }

  await newDb.query(`
    CREATE INDEX IF NOT EXISTS articles_embedding_hnsw_ip_idx
    ON articles USING hnsw (embedding vector_ip_ops)
    WITH (m = 16, ef_construction = 100);
  `);

  // Step 5: Dump new DB data directory to a compressed tarball Blob/File
  const dumpFile = await newDb.dumpDataDir('gzip');

  return dumpFile;
}

export async function insertArticle(
  title: string,
  text: string,
  category: string
): Promise<void> {
  await initEmbedder();
  const embedding = await embedText(text, 'document');
  const embeddingStr = `[${embedding.join(',')}]`;
  await db.query(
    "INSERT INTO articles (title, text, category, embedding) VALUES ($1, $2, $3, $4)",
    [title, text, category, embeddingStr]
  );
}

export async function getCategories(): Promise<string[]> {
  const res = await db.query("SELECT DISTINCT category FROM articles");
  return (res.rows as { category: string }[]).map((r) => r.category);
}

export async function getArticlesByCategory(category: string, limit: number): Promise<Article[]> {
  const res = await db.query(
    `SELECT * FROM articles WHERE category = $1 LIMIT ${limit}`,
    [category]
  );
  return res.rows as Article[];
}

export async function searchSimilarArticles(query: string, limit: number): Promise<Article[]> {
  await initEmbedder();
  const embedding = await embedText(query, 'query');
  const embeddingStr = `[${embedding.join(',')}]`;
  const result = await db.query(
    `SELECT id, title, text, category, embedding <-> $1 AS similarity
     FROM articles
     ORDER BY embedding <-> $1
     LIMIT ${limit}`,
    [embeddingStr]
  );
  return result.rows as Article[];
}