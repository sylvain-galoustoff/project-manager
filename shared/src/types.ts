export interface User {
  _id: string;
  name: string;
  displayName: string;
  role: "user" | "admin";
  password: string;
  createdAt: Date;
  __v?: number;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
}
export interface apiResponse {
  status: "error" | "success";
  message: string;
  data?: User;
}
