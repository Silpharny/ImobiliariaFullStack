import { model, Schema } from "mongoose"

const UserSchema = new Schema({
  email: { type: String },
})

export default model("User", UserSchema)
