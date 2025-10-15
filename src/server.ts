import { error } from "console";
import app from "./app";

import { Server } from "http"
import mongoose from "mongoose";

let server: Server

const PORT = 5000

async function main() {
 try {
  await mongoose.connect("mongodb+srv://hossainahmed2ndmarch:RAHAT2ndmarch@cluster0.c6qkm.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0");
  console.log("Mongoose Connected");

  server = app.listen(PORT, () => { console.log(`Example app listening on ${PORT}`) })
 } catch {
  console.log(error);
 }
}

main()