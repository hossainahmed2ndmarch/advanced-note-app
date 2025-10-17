import { model, Schema } from "mongoose"
import { INote } from "../interfaces/note.interface"

// schema 
const noteSchema = new Schema<INote>({
 title: { type: String, required: true, trim: true },
 content: { type: String, default: "" },
 category: {
  type: String,
  enum: ["Personal", "Work", "Study", "Other"],
  default: "Personal"
 },
 pinned: {
  type: Boolean,
  default: false
 },
 tags: {
  label: { type: String, required: true },
  color: { type: String, default: "Blue" }
 },
 user: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
 }
},
 {
  versionKey: false,
  timestamps: true
 })

// Model
export const Note = model<INote>("Note", noteSchema)