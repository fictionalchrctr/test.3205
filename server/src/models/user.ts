import { Schema, model } from 'mongoose'

export interface IUser {
  email: string
  number: string
}

const schema = new Schema<IUser>({
  email: String,
  number: String,
})

export const userModel = model('User', schema)
