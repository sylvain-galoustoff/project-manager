import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: /^http:\/\/localhost(:\d+)?$/, // adresse du client
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // si tu veux gérer les cookies ou JWT
  })
);

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (_, res) => {
  res.send("Nothing here");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
