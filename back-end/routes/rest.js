const router = require("express").Router();
const { Pin } = require("../models/Pin");


// fetching all pins
// router.get("/searchRest", async (req, res) => {
//   try {
//     const pins = await Pin.find();
//     res.status(200).json(pins);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/rest', async (req, res) => {
    console.log(req.params.name)
    const name = req.params.name
    console.log(name)
    try {
      const pin = await Pin.find();
      console.log(pin)
      res.json({
        pin: pin,
        status: 'all good',
      })
    } catch (err) {
      console.error(err)
      res.status(400).json({
        error: err,
        status: 'failed to retrieve pin from the database',
      })
    }
  })


module.exports = router;