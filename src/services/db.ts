// services/db.ts
import { PGlite, MemoryFS, type PGliteOptions } from "@electric-sql/pglite";
import { vector } from "@electric-sql/pglite/vector";
import { BASE_PATH } from "./utils";
import { initEmbedder, embedText } from "./embed";
import { Article } from "../types";

const DB_NAME = "bbc_articles";
let db: PGlite | null = null;

/** Fetches the dumped PGlite database file from the public folder */
async function fetchDbFileFromPublic(): Promise<File> {
  const res = await fetch(`${BASE_PATH}/database/${DB_NAME}.db`);
  const blob = await res.blob();
  return new File([blob], DB_NAME, { type: "application/gzip" });
}

/** Initialize the PGlite database from IDB if possible, otherwise load from file and store to IDB */
export async function initDB(): Promise<PGlite> {
  if (db) return db;

  // i want to somehow load from IDB if it exists, or load from the file and save to IDB if not, but idk how to do this
  const file = await fetchDbFileFromPublic();
  const config: PGliteOptions = {
    fs: new MemoryFS(),
    extensions: { vector },
    loadDataDir: file
  }

  db = await PGlite.create(config);
  return db;
}

// DB FUNCTIONS

export async function insertArticle(title: string, text: string, category: string): Promise<void> {
  await initEmbedder();
  const embedding = await embedText(text, "document");
  const embeddingStr = `[${embedding.join(",")}]`;

  const dbInstance = await initDB();
  await dbInstance.query(
    "INSERT INTO articles (title, text, category, embedding) VALUES ($1, $2, $3, $4)",
    [title, text, category, embeddingStr]
  );
}

export async function getCategories(): Promise<string[]> {
  const dbInstance = await initDB();
  const res = await dbInstance.query("SELECT DISTINCT category FROM articles");
  return (res.rows as { category: string }[]).map((r) => r.category);
}

export async function getArticlesByCategory(category: string, limit: number): Promise<Article[]> {
  const dbInstance = await initDB();
  const res = await dbInstance.query(
    `SELECT * FROM articles WHERE category = $1 ORDER BY RANDOM() LIMIT $2`,
    [category, limit]
  );
  return res.rows as Article[];
}

export async function searchSimilarArticles(query: string, limit: number): Promise<Article[]> {
  await initEmbedder();
  const embedding = await embedText(query, "query");
  const embeddingStr = `[${embedding.join(",")}]`;

  const dbInstance = await initDB();
  const result = await dbInstance.query(
    `SELECT id, title, text, category, embedding <-> $1 AS similarity
     FROM articles
     ORDER BY embedding <-> $1
     LIMIT ${limit}`,
    [embeddingStr]
  );
  return result.rows as Article[];
}

// CLONING
interface ArticleRow {
  id: number;
  title: string;
  text: string;
  category: string;
  embedding: string;
}

export async function clonePgliteDatabase(): Promise<File | Blob> {
  const originalDb = await initDB();
  const newDb = await PGlite.create({ extensions: { vector } });

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

  const articles = await originalDb.query<ArticleRow>(
    `SELECT id, title, text, category, embedding FROM articles`
  );

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

  return await newDb.dumpDataDir("gzip");
}
