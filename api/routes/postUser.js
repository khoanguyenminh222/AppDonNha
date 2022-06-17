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

router.get("/", async (req,res)=>{
    const arrayLocation = {};
    const location = {};
    try {
        const posts = await PostUser.find({});
        posts.forEach(post => {
            
            const key = post.id;
            location = {...location,key: post.location};
            arrayLocation.push(location);
        });
        console.log(location);
        const getLocation = geolib.orderByDistance({ latitude: 51.515, longitude: 7.453619 }, arrayLocation);
        res.status(200).json(getLocation);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;