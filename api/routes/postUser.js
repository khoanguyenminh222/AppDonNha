const router = require("express").Router();
const User = require("../models/User");
const PostUser = require("../models/PostUser");
const geolib = require("geolib");
var sd = require("string_decoder").StringDecoder;
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
      { $match: { isWaiting: false } },
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

//lấy ra tin dược tìm kiếm
router.get("/search", async (req, res) => {
  try {
    const txt = req.query.txt;
    console.log(txt);
    const posts = await PostUser.find({
      isWaiting: false,
      $text: { $search: "'" + txt + "'" },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

//lấy ra tin dược tìm kiếm
router.get("/filter", async (req, res) => {
  try {
    const txt = req.query.txt;
    console.log(txt);
    const posts = await PostUser.find({
      isWaiting: false,
      nameOrganization: { $exists: txt },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

//lấy ra tin mới nhất
router.get("/new", async (req, res) => {
  try {
    const txt = req.query.txt;
    const posts = await PostUser.find({ isWaiting: false }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

//xem tin của người dùng
router.get("/:userId", async (req, res) => {
  try {
    const posts = await PostUser.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e);
  }
});

//cập nhật tin
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.body.admin);
  const post = await PostUser.findById(req.params.id);
  if (req.body.userId === post.userId || user.isAdmin) {
    try {
      const editPost = await PostUser.findByIdAndUpdate(
        req.params.id,
        {
          $set : req.body
        },
        { new: true }
      );
      if (req.body.coordinates) {
        editPost.location.coordinates = req.body.coordinates;
      }
      res.status(200).json(editPost);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    return res.status(403).json("Chỉ có thể cập nhật tin của mình!");
  }
});

// xoá tin
router.delete("/:id", async(req,res)=>{
  try {
    const post = await PostUser.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'Xoá thành công'});
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
