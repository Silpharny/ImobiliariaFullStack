import { Schema, model } from "mongoose"

const BookSchema = new Schema({
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: "House",
  },
})

export default model("Book", BookSchema)
