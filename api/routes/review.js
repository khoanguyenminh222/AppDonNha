const router = require("express").Router();
const User = require("../models/User");
const Review = require("../models/Review");

//Đăng Review
router.post("/", async (req, res) => {
  const newReview= new Review(req.body);
  try {
    const saveReview = await newReview.save();
    res.status(200).json(saveReview);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:userId", async (req, res) => {
    try {
      const newReview = await Review.find(
        {userId: req.params.userId}
      ).sort({createdAt:-1});
      res.status(200).json(newReview);
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.get("/averageRating/:userId", async (req, res) => {
    try {
      const newReview = await Review.find(
        {userId: req.params.userId}
      ).sort({createdAt:-1});
      let sum = 0;
      if(newReview.length==0){
        res.status(200).json({message: 'Chưa có đánh giá'});
      }else{
        newReview.forEach(element => {
          sum = sum+ parseInt(element.ratingStar);
        });
        const average = parseFloat(sum/newReview.length).toFixed(1);
        res.status(200).json(average);
      }
      
    } catch (e) {
      res.status(500).json(e);
    }
  });
module.exports = router;