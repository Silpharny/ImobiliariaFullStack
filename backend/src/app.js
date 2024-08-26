import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import routes from "./routes.js"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import "dotenv/config"

const URI = process.env.SECRET_KEY

class App {
  constructor() {
    this.server = express()

    mongoose.connect(URI)

    this.middleware()
    this.routes()
  }

  middleware() {
    this.server.use(cors())

    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    )

    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
