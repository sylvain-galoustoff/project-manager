import { Router } from "express";
import { getUsers, registerUser, userLogin } from "../Controllers/UserController";

const router = Router();

/**
 * POST /users
 * Obtenir tous les utilisateurs
 */
router.get("/", getUsers);

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
