import { Router } from "express";
import { registerUser, userLogin } from "../Controllers/UserController";

const router = Router();

/**
 * POST /users/register
 * Enregistre un nouvel utilisateur
 */
router.post("/register", registerUser);

/**
 * POST /users/login
 * Connecter l'utilisateur
 */
router.post("/login", userLogin);

export default router;
