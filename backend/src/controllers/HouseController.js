class HouseController {
  async store(req, res) {
    return res.json({ message: "store" })
  }
}

export default new HouseController()
