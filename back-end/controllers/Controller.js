// Made with the help and tutorial of https://www.telerik.com/blogs/how-to-implement-standard-search-using-react in accordance with the requirements of the CS department at NYU

const router = require("express").Router();

router.get("/search"), async (req, res) => {
    try {
        const { q } = req.query;
        const restaurant = await Product.find({ name: { $regex: q, $options: 'i' } });

        if (restaurant.length < 1) throw new ErrorHandler(404, 'No restaurant found');

        res.status(201).json({
        status: 'success',
        message: 'Restaurant has been found successfully',
        restaurant,
        });
    } catch (error) {
        console.log(err);
    }
};

router.post("/search"),async(req, res, next) => {
    try {
        const { q } = req.query;
        const restaurant = await Product.find({ name: { $regex: q, $options: 'i' } });

        if (restaurant.length < 1) throw new ErrorHandler(404, 'No restaurant found');

        res.status(201).json({
        status: 'success',
        message: 'Restaurant has been found successfully',
        restaurant,
        });
    } catch (error) {
        console.log(err);
    }
};
module.exports = router;

// const router = require("express").Router()
// const Rest = require("../models/Pin")

// router.get("/create", (req,res) => {
//     res.send("creating")
// })

// router.post("/create", async (req,res) => {

//     const newRest = new Rest({
//         username : req.body.username,
//         title : req.body.title,
//         desc : req.body.desc,
//         foodRating : req.body.foodRating,
//         vibesRating : req.body.vibesRating,
//         long : req.body.long,
//         lat : req.body.lat
//     })
//     const savedRest = await newRest.save()
//     res.send(savedRest)
// })

// router.post("/search", async (req,res) => {
//     const allRest = await User.find({title : req.body.title})
//     if(!allRest || allRest.length === 0) res.status(400).send({error : "No User was found"})
//     res.status(200).send(allRest)
// })
// module.exports = router