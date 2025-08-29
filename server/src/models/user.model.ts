import { Schema, model } from "mongoose";
import type { User } from "@meloprojects/shared";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  __v: { type: Number, select: false },
});

export const UserModel = model<User>("User", userSchema);
