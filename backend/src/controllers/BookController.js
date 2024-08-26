import Book from "../models/Book.js"

class BookController {
  async store(req, res) {
    const { user_id } = req.headers
    const { house_id } = req.params
    const { date } = req.body

    const booking = await Book.create({
      date,
      user: user_id,
      house: house_id,
    })
    await booking.populate(["user", "house"])

    return res.json(booking)
  }
}

export default new BookController()
