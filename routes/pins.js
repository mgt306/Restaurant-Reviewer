const router = require("express").Router();
const Pin = require("../models/Pin");

// creating pins 
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add reviews to a restaurant
router.put("/:id", async(req, res, next) => {
  try{
    await Pin.findByIdAndUpdate({_id: req.params.id}, {$addToSet: req.body});
    const updatePin = await Pin.findOne({_id: req.params.id});
    res.status(200).json(updatePin);
  } catch (err){
    res.status(500).json(err);
  }
});

// fetching all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res)=>{
  try{
    const singlePin = await Pin.findOne({_id: req.params.id});
    res.status(200).json(singlePin);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;