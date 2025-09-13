import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

const startServer = async () => {
  dotenv.config({ path: "../.env" });
  const PORT = Number(process.env.PORT) || 4000;
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  });
};

startServer();
