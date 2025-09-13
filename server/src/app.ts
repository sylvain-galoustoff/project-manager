import express from "express";
import usersRouter from "./routes/user.routes";
import projectsRouter from "./routes/project.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/project", projectsRouter);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint inconnu",
    data: null,
  });
});

export default app;
