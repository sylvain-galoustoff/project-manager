import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { apiResponse } from "@meloprojects/shared";

/**
 * Enregistre un nouvel utilisateur
 */
export const registerUser = async (req: Request, res: Response<apiResponse>) => {
  try {
    const { name, displayName, role, password } = req.body;

    // Vérifier les champs obligatoires
    if (!name || !displayName || !password) {
      return res.status(400).json({
        status: "error",
        message: "Les champs name, displayName et password sont obligatoires",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ name });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Un utilisateur avec ce nom existe déjà",
      });
    }

    // Créer l'utilisateur
    const newUser = new UserModel({
      name,
      displayName,
      role: role || "user",
      password, // ⚠️ à remplacer plus tard par un hash (bcrypt)
    });

    // Sauvegarder en BDD
    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "Utilisateur enregistré avec succès",
      data: {
        _id: newUser._id,
        name: newUser.name,
        displayName: newUser.displayName,
        role: newUser.role,
        password: "hidden",
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement d'un utilisateur :", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur",
    });
  }
};
