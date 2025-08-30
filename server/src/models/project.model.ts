import { Schema, model } from "mongoose";
import type { Project } from "@meloprojects/shared";

const projectSchema = new Schema<Project>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    users: {
      type: [String],
      default: [],
    },
    deadline: {
      type: Date,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: "__v",
  }
);

export const ProjectModel = model<Project>("User", projectSchema);
