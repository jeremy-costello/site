interface Preview {
  title: string,
  description: string,
  path: string,
  image?: string
}

export const previews: Preview[] = [
  {
    title: "Background Image",
    description: "Change the site's background image and opacity.",
    path: "/background"
  },
  {
    title: "About the Database",
    description: "Information about the database and models for semantic search and RAG.",
    path: "/database",
  },
  {
    title: "Browse Categories",
    description: "View articles in the database organized by category.",
    path: "/categories"
  },
  {
    title: "Semantic Search",
    description: "Search for articles in the database by semantic similarity.",
    path: "/search"
  },
  {
    title: "RAG Chat",
    description: "Talk to a chatbot about articles in the database.",
    path: "/chat"
  },
  {
    title: "Music",
    description: "List to some of the music I have made.",
    path: "/music"
  },
  {
    title: "Poetry",
    description: "Read some of the poetry I have written.",
    path: "/poetry"
  },
  {
    title: "Cesium Map",
    description: "Play around with a 2D/3D map using Cesium.",
    path: "/map"
  }
];