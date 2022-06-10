const router = require("express").Router();
const User = require("../models/User");


// xác minh người dùng.
router.put("/user/:id", async (req, res) => {
  try {
    const admin = await User.findById(req.body.userId);
    if (admin.isAdmin) {
      try {
        User.findByIdAndUpdate(
          req.params.id,
          { isVerify: true },
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
});

module.exports = router;
