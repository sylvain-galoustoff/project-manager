import { Router } from "express";
import { registerProject } from "../Controllers/ProjectController";

const router = Router();

/**
 * POST /users/register
 * Enregistre un nouvel utilisateur
 */
router.post("/register", registerProject);

export default router;
