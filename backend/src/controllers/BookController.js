import Book from "../models/Book.js"
import House from "../models/House.js"

class BookController {
  async index(req, res) {
    const { user_id } = req.headers

    const booking = await Book.find({ user: user_id }).populate("house")

    return res.json(booking)
  }

  async store(req, res) {
    const { user_id } = req.headers
    const { house_id } = req.params
    const { date } = req.body

    const house = await House.findById(house_id)

    if (!house) {
      return res.status(400).json({ error: "House not found" })
    }

    if (house.status !== true) {
      return res.status(400).json({ error: "House unavailable" })
    }

    const booking = await Book.create({
      date,
      user: user_id,
      house: house_id,
    })

    await booking.populate(["user", "house"])

    return res.json(booking)
  }

  async destroy(req, res) {
    const { booking_id } = req.body

    await Book.findByIdAndDelete({ _id: booking_id })

    return res.send({ message: "Booking deleted" })
  }
}

export default new BookController()
