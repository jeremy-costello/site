import { LEFT_ALIGN } from "./Constants";

export const database = {
  objective: {
    preamble: "The objective of this part of the website was to make a client-side retrieval-augmented generation (RAG) chatbot. For this I needed a dataset, a database, a text embedding model, a similarity search algorithm, and a large language model."
  },
  data: {
    preamble: "RAG requires a dataset and a database to retrieve from.",
    items: [
      {
        title: "Dataset",
        link: "https://www.kaggle.com/datasets/shivamkushwaha/bbc-full-text-document-classification",
        contents: "writing/database/data.md",
        align: LEFT_ALIGN
      },
      {
        title: "Database",
        link: "https://github.com/electric-sql/pglite",
        contents: "writing/database/database.md",
        align: LEFT_ALIGN
      }
    ]
  },
  search: {
    preamble: "Semantic search embeddings place documents and queries into the same vector space, so the user can input a query and find similar documents within the database.",
    items: [
      {
        title: "Embeddings",
        link: "https://github.com/ngxson/wllama",
        contents: "writing/database/embeddings.md",
        align: LEFT_ALIGN
      },
      {
        title: "Embedding Model",
        link: "https://huggingface.co/nomic-ai/nomic-embed-text-v1.5-GGUF",
        contents: "writing/database/embedding_model.md",
        align: LEFT_ALIGN
      },
      {
        title: "HNSW Indexing",
        link: "https://github.com/pgvector/pgvector",
        contents: "writing/database/hnsw_indexing.md",
        align: LEFT_ALIGN
      }
    ],
  },
  chat: {
    preamble: "Putting it all together! The user's intial query is used for semantic search, and the user can continue chatting about retrieved documents.",
    items: [
      {
        title: "Generative AI",
        link: "https://searchfox.org/mozilla-central/source/toolkit/components/ml/vendor/wllama",
        contents: "writing/database/generative_ai.md",
        align: LEFT_ALIGN
      },
      {
        title: "Large Language Model",
        link: "https://huggingface.co/Qwen/Qwen3-0.6B-GGUF",
        contents: "writing/database/large_language_model.md",
        align: LEFT_ALIGN
      }
    ]
  }
};
