import { Router } from "express";
import {
  getUsers,
  registerUser,
  updateUser,
  userLogin,
} from "../Controllers/UserController";

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

/**
 * POST /users/update
 * Modifier l'utilisateur
 */
router.post("/update", updateUser);

export default router;
