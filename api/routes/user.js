const router = require("express").Router();
const User = require("../models/User");

//lấy ra tất cả người dùng
router.get("/:id/getAll", async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    //kiểm tra có phải admin
    if (admin.isAdmin) {
      try {
        User.find({}, (err, docs) => {
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

//lấy ra tất cả người dùng đang đợi xác nhận
router.get("/:id/getAllVerify", async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    //kiểm tra có phải admin
    if (admin.isAdmin) {
      try {
        User.find({ waiting: true }, (err, docs) => {
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

// lấy ra người dùng
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) {
      res.status(403).json({message: "Tài khoản không tồn tại!"});
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//cập nhật người dùng
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (req.body.userId === req.params.id || user.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    return res.status(403).json("Chỉ có thể cập nhật tài khoản của mình!");
  }
});

module.exports = router;
