import { Router } from "express"
import multer from "multer"
import uploadConfig from "./config/upload.js"
import BookController from "./controllers/BookController.js"
import DashboardController from "./controllers/DashboardController.js"
import HouseController from "./controllers/HouseController.js"
import SessionController from "./controllers/SessionController.js"

const routes = new Router()
const upload = multer(uploadConfig)

routes.post("/sessions", SessionController.store)

routes.post("/houses", upload.single("thumbnail"), HouseController.store)
routes.get("/houses", HouseController.index)
routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
)
routes.delete("/houses/", HouseController.destroy)

routes.get("/dashboard", DashboardController.show)

routes.post("/houses/:house_id/book", BookController.store)
routes.get("/book", BookController.index)
routes.delete("/book/cancel", BookController.destroy)

export default routes
