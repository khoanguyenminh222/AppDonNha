const router = require("express").Router();
const User = require("../models/User");
const PostUser = require("../models/PostUser");
const geolib = require('geolib');

router.post("/", async (req,res)=>{
    const newPost = new PostUser(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
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