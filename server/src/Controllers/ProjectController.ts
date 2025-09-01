import { Request, Response } from "express";
import { ProjectModel } from "../models/project.model";
import { apiResponse, Project } from "@meloprojects/shared";

/**
 * Obtenir tous les utilisateurs
 */
// export const getUsers = async (req: Request, res: Response<apiResponse>) => {
//   try {
//     const users: User[] = await ProjectModel.find().select("-password").lean();
//     const response: apiResponse = {
//       status: "success",
//       message: "Liste des utilisateurs récupérée avec succès",
//       data: users,
//     };
//     res.json(response);
//   } catch (err) {
//     console.error("Erreur lors de la récupération des utilisateurs :", err);
//     const response: apiResponse = {
//       status: "error",
//       message: "Erreur lors de la récupération des utilisateurs",
//       data: undefined,
//     };
//     res.status(500).json(response);
//   }
// };

/**
 * Enregistre un nouvel utilisateur
 */
export const registerProject = async (req: Request, res: Response<apiResponse>) => {
  try {
    const { name, ownerId, users, deadline, createdAt } = req.body;

    // Vérifier les champs obligatoires
    if (!name || !ownerId) {
      return res.status(400).json({
        status: "error",
        message: "Le champ Nom de projet est obligatoire",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await ProjectModel.findOne({ name });
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Un projet avec ce nom existe déjà",
      });
    }

    // Créer l'utilisateur
    const newProject = new ProjectModel({
      name,
      ownerId,
      users,
      deadline,
      createdAt,
    });
    await newProject.save();

    return res.status(201).json({
      status: "success",
      message: "Projet enregistré avec succès",
      data: {
        _id: newProject._id,
        name: newProject.name,
        deadline,
        ownerId: newProject.ownerId,
        users: newProject.users,
        createdAt: newProject.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du projet", error);
    return res.status(500).json({
      status: "error",
      message: "Erreur interne du serveur (ProjectController/register)",
    });
  }
};
/**
 * connecter l'utilisateur
 */
// export const userLogin = async (req: Request, res: Response<apiResponse>) => {
//   try {
//     const { name, password } = req.body;

//     // Vérifier si l'utilisateur existe déjà
//     const findUser = await ProjectModel.findOne({ name, password });
//     console.log(findUser);

//     if (!findUser) {
//       const response: apiResponse = {
//         status: "error",
//         message: "Nom ou mot de passe incorrect",
//       };
//       return res.status(401).json(response);
//     } else {
//       return res.status(201).json({
//         status: "success",
//         message: "Utilisateur connecté",
//         data: findUser,
//       });
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
//     return res.status(500).json({
//       status: "error",
//       message: "Erreur interne du serveur (UserController/login)",
//     });
//   }
// };
