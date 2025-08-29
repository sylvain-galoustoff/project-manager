import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/project-manager";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connecté à MongoDB project-manager");
  } catch (err) {
    console.error("❌ Erreur de connexion MongoDB :", err);
    process.exit(1);
  }
};
