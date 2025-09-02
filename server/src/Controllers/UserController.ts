import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { apiResponse, User } from "@meloprojects/shared";

/**
 * Obtenir tous les utilisateurs
 */
export const getUsers = async (req: Request, res: Response<apiResponse>) => {
  try {
    const users: User[] = await UserModel.find().select("-password").lean();
    const response: apiResponse = {
      status: "success",
      message: "Liste des utilisateurs récupérée avec succès",
      data: users,
    };
    res.json(response);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    const response: apiResponse = {
      status: "error",
      message: "Erreur lors de la récupération des utilisateurs",
      data: undefined,
    };
    res.status(500).json(response);
  }
};

/**
 * Enregistre un nouvel utilisateur
 */
export const registerUser = async (req: Request, res: Response<apiResponse>) => {
  try {
    const { name, password } = req.body;

    // Vérifier les champs obligatoires
    if (!name || !password) {
      return res.status(400).json({
        status: "error",
        message: "Les champs name et password sont obligatoires",
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
      role: "user",
      password,
    });
    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "Utilisateur enregistré avec succès",
      data: {
        _id: newUser._id,
        name: newUser.name,
        displayName: "",
        role: newUser.role,
        password: "hidden",
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur (UserController/register)",
    });
  }
};

/**
 * connecter l'utilisateur
 */
export const userLogin = async (req: Request, res: Response<apiResponse>) => {
  try {
    const { name, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const findUser = await UserModel.findOne({ name, password });
    console.log(findUser);

    if (!findUser) {
      const response: apiResponse = {
        status: "error",
        message: "Nom ou mot de passe incorrect",
      };
      return res.status(401).json(response);
    } else {
      return res.status(201).json({
        status: "success",
        message: "Utilisateur connecté",
        data: findUser,
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur (UserController/login)",
    });
  }
};

/**
 * Met à jour plusieurs champs d'un utilisateur
 */
export const updateUser = async (req: Request, res: Response<apiResponse>) => {
  try {
    const { userId, updates } = req.body;

    if (!userId || !updates || typeof updates !== "object") {
      return res.status(400).json({
        status: "error",
        message: "Les champs userId et updates sont obligatoires",
      });
    }

    const allowedKeys = ["name", "displayName", "role", "password"];
    const filteredUpdates: Record<string, any> = {};

    Object.entries(updates).forEach(([key, value]) => {
      if (allowedKeys.includes(key)) {
        filteredUpdates[key] = value;
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Aucune clé valide à mettre à jour",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true, select: "-password" }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "Utilisateur non trouvé",
      });
    }

    return res.json({
      status: "success",
      message: "Utilisateur mis à jour avec succès",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur (UserController/updateUser)",
    });
  }
};
