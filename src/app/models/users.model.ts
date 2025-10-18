import { Model, model, Schema } from "mongoose";
import validator from "validator"
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import bcrypt from "bcryptjs"


const addressSchema = new Schema<IAddress>({
 country: { type: String },
 city: { type: String },
 street: { type: String },
 zip: { type: Number }
}, {
 _id: false
})


const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
 firstName: {
  type: String,
  required: true,
  trim: true
 },
 lastName: {
  type: String,
  required: true,
  trim: true
 },
 age: {
  type: Number,
  required: true,
  min: 18,
  max: 60
 },
 email: {
  type: String,
  unique: true,
  lowercase: true,
  required: true,
  trim: true,
  // validate: {
  //  validator: function (v) {
  //   return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
  //  },
  //  message: props => `${props.value} is not a valid email address!`
  // }
  validate: [validator.isEmail, "Invalid Email {VALUE}"]
 },
 address: { type: addressSchema },
 password: {
  type: String,
  required: true,
 },
 role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user'
 }
}, {
 versionKey: false,
 timestamps: true
})

// Instance Method 
userSchema.method("hashPassword", async function (plainPassword) {
 const password = await bcrypt.hash(plainPassword, 10)
 this.password = password
})

// Static Method 
userSchema.static("hashPassword", async function (plainPassword) {
 const password = await bcrypt.hash(plainPassword, 10)
 return password
})

export const User = model<IUser, UserStaticMethods>('User', userSchema);