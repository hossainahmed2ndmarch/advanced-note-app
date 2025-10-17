import express, { Request, Response } from "express";
import { User } from "../models/users.model";
import z from "zod";

export const usersRoutes = express.Router()

const CreateUserZodSchema = z.object({
 firstName: z.string(),
 lastName: z.string(),
 age: z.number(),
 email: z.string(),
 password: z.string(),
 role: z.string().optional()
})

// user create: post 
usersRoutes.post('/create-user', async (req: Request, res: Response) => {
 const body = CreateUserZodSchema.parse(req.body)
 const user = await User.create(body)

 res.status(201).json({
  success: true,
  message: "User created successfully",
  user
 })
})

// Get all users: get
usersRoutes.get('/', async (req: Request, res: Response) => {
 const users = await User.find()

 res.status(201).json({
  success: true,
  message: "Users found successfully",
  users
 })
})

// Get single user 
usersRoutes.get('/:userId', async (req: Request, res: Response) => {
 const userId = req.params.userId
 const user = await User.findById(userId)

 res.status(201).json({
  success: true,
  message: "User found successfully",
  user
 })
})


// Update single user : patch
usersRoutes.patch('/:userId', async (req: Request, res: Response) => {
 const userId = req.params.userId
 const body = req.body
 const updatedUser = await User.findByIdAndUpdate(userId, body, {
  new: true
 })

 res.status(201).json({
  success: true,
  message: "Users updated successfully",
  updatedUser
 })
})

// Delete single user 
usersRoutes.delete('/:userId', async (req: Request, res: Response) => {
 const userId = req.params.userId
 const deletedUser = await User.findByIdAndDelete(userId)

 res.status(201).json({
  success: true,
  message: "User deleted successfully",
  deletedUser
 })
})