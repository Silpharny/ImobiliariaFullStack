import * as Yup from "yup"
import House from "../models/House.js"
import User from "../models/User.js"

class HouseController {
  async index(req, res) {
    const { status } = req.query

    const houses = await House.find({ status })

    return res.json(houses)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    })

    const { filename } = req.file
    const { description, price, location, status } = req.body
    const { user_id } = req.headers

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" })
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    })

    return res.json(house)
  }

  async update(req, res) {
    const { filename } = req.file
    const { house_id } = req.params
    const { user_id } = req.headers
    const { description, price, location, status } = req.body

    const user = await User.findById(user_id)
    const houses = await House.findById(house_id)

    if (String(user._id) !== String(houses.user)) {
      return res.status(401).json({ error: "Operation not permitted" })
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    )

    return res.send({ message: "House updated" })
  }

  async destroy(req, res) {
    const { house_id } = req.body

    await House.findByIdAndDelete({ _id: house_id })

    return res.send({ message: "House deleted" })
  }
}

export default new HouseController()
