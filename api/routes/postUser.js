const router = require("express").Router();
const User = require("../models/User");
const PostUser = require("../models/PostUser");
const geolib = require("geolib");

// đăng tin
router.post("/", async (req, res) => {
  const newPost = new PostUser(req.body);
  newPost.location.coordinates = req.body.coordinates;
  console.log(newPost);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


//lấy ra tin với vị trí gần người dùng
router.get("/", (req, res) => {
  try {
    PostUser.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          },
          distanceField: "dist.calculated",
          maxDistance: 10000,
          spherical: true,
        },
      },
      {$match:{isWaiting: false}},
      {$skip: (parseFloat(req.query.page)-1)*5},
      {$limit: 5}
    ]).then(function (posts) {
      res.status(200).json(posts);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/getPostWaiting", async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    //kiểm tra có phải admin
    if (admin.isAdmin) {
      try {
        PostUser.find({ isWaiting: true }, (err, docs) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(docs);
          }
        });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("không phải admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//xem tin của người dùng
router.get("/:userId", async (req, res) => {
  try {
    const posts = await PostUser.find(
      {userId: req.params.userId}
    );
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

//cập nhật tin
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.body.admin);
  if (req.body.userId === req.params.id || user.isAdmin) {
    try {
      const post = await PostUser.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    return res.status(403).json("Chỉ có thể cập nhật tin của mình!");
  }
});

module.exports = router;
