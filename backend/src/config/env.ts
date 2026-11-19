import dotenv from "dotenv";

dotenv.config();

const _env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV ?? "development",
  isDev: process.env.NODE_ENV?.toLowerCase() === "development",
  databaseUrl: process.env.DATABASE_URL!,
  clientUrl: process.env.CLIENT_URL,
  clientUrls: (
    process.env.CLIENT_URLS ??
    process.env.CLIENT_URL ??
    "http://localhost:3000"
  )
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
};

export const env = Object.freeze(_env);
