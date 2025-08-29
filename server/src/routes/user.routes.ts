import { Router } from "express";
import { registerUser } from "../Controllers/UserController";

const router = Router();

/**
 * POST /users/register
 * Enregistre un nouvel utilisateur
 */
router.post("/register", registerUser);

export default router;
