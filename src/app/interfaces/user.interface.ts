import { Model } from "mongoose"

export interface IAddress {
 country: string,
 city: string,
 street: string,
 zip: number
}

export interface IUser {
 firstName: string,
 lastName: string,
 age: number,
 email: string,
 address: IAddress,
 password: string,
 role: "user" | "admin"
}

// Instance Method
export interface UserInstanceMethods {
 hashPassword(password: string): string
}

// Static Method

export interface UserStaticMethods extends Model<IUser> {
 hashPassword(password: string): string
}