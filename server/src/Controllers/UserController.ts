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
