"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.updateUserSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
    name: zod_1.z.string().optional(),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.email().optional(),
    name: zod_1.z.string().optional(),
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
});
exports.updateBlogSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Invalid blog ID"),
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
});
