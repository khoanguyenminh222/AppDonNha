const router = require("express").Router();
const User = require("../models/User");

//lấy ra tất cả người dùng
router.get("/:id/getAll", async(req,res)=>{
  try {
    const admin = await User.findById(req.params.id);
    if (admin.isAdmin) {
      try {
        User.find(
          {},
          (err, docs) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(200).json(docs);
            }
          }
        );
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("không phải admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

//cập nhật người dùng
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Cập nhật thành công");
    } catch (e) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Chỉ có thể cập nhật tài khoản của mình!");
  }
});


module.exports = router;