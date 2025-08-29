import express from "express";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = 3000;

app.use("/users", userRoutes);

app.get("/", (_, res) => {
  res.send("Nothing here");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
