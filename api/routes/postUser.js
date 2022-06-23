const router = require("express").Router();
const User = require("../models/User");
const PostUser = require("../models/PostUser");
const geolib = require('geolib');

router.post("/", async (req,res)=>{
    const newPost = new PostUser(req.body);
    newPost.location.coordinates = req.body.coordinates;
    console.log(newPost);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/", (req,res)=>{
    try {
        PostUser.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
                },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
              },
            },
          ])
            .then(function (posts) {
              res.status(200).json(posts);
            })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;