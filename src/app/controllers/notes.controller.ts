import express, { Request, Response } from "express"
import { Note } from "../models/notes.model"



export const notesRoutes = express.Router()

// Note create: post
notesRoutes.post("/create-note", async (req: Request, res: Response) => {

 const body = req.body
 const note = await Note.create(body)

 // 1st Approach
 // const myNote = new Note({
 //  title: "Learning Tawekondo"
 // })
 // await myNote.save()
 res.status(201).json({
  success: true,
  message: "Note created successfully",
  note
 })
})

// Get all notes
notesRoutes.get("/", async (req: Request, res: Response) => {

 const notes = await Note.find().populate("user")

 res.status(201).json({
  success: true,
  message: "Note created successfully",
  notes
 })
})

// Get single note
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
 const noteId = req.params.noteId
 const note = await Note.findById(noteId)

 res.status(201).json({
  success: true,
  message: "Note created successfully",
  note
 })
})

// Update single note:Patch
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
 const noteId = req.params.noteId
 const updatedBody = req.body
 const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true })
 // const note = await Note.findOneAndUpdate({_id: noteId}, updatesBody, { new: true })
 // const note = await Note.updateOne({_id: noteId}, updatesBody, { new: true })

 res.status(201).json({
  success: true,
  message: "Note updated successfully",
  note
 })
})

// Delete single note:delete
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
 const noteId = req.params.noteId
 const note = await Note.findByIdAndDelete(noteId)
 // const note = await Note.findOneAndDelete({_id: noteId})
 // const note = await Note.deleteOne({ _id: noteId })

 res.status(201).json({
  success: true,
  message: "Note Deleted successfully",
  note
 })
})