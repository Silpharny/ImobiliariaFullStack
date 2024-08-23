import { Router } from "express"
import HouseController from "./controllers/HouseController.js"
import SessionController from "./controllers/SessionController.js"

const routes = new Router()

routes.post("/sessions", SessionController.store)
routes.post("/houses", HouseController.store)
export default routes
