import { email, z } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const updateUserSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
});

export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updateBlogSchema = z.object({
  id: z.string().min(1, "Invalid blog ID"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type UpdateBlogSchema = z.infer<typeof updateBlogSchema>;
