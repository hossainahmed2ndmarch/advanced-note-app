
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