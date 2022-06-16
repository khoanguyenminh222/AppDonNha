const router = require("express").Router();
const User = require("../models/User");
const Notify = require("../models/Notify");

// lấy ra thông báo
router.get("/:id", async (req, res) => {
  try {
    const result = await Notify.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// lấy thông báo của người dùng
router.get("/user/:id", async (req, res) => {
  try {
    const result = await Notify.find({ userId: req.params.id }).sort({updatedAt: -1});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// lấy thông báo chưa đọc của người dùng
router.get("/notread/user/:id", async (req, res) => {
  try {
    const result = await Notify.find({ userId: req.params.id, readed: false });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// tạo thông báo
router.post("/", async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (user) {
    const newNotify = new Notify(req.body);
    try {
      const savedNotify = await newNotify.save();
      res.status(200).json(savedNotify);
    } catch (err) {
      res.status(500).json(err);
    }
  }else{
    res.status(500).json("Không tìm thấy người dùng");
  }
});

//cập nhật thông báo
router.put("/:id", async (req,res)=>{
  try {
    console.log(req.body);
    const notify = await Notify.findById(req.params.id);
    if (notify.userId === req.body.userId) {
      await notify.updateOne({ $set: req.body });
      res.status(200).json("Thông báo được cập nhật");
    } else {
      res.status(403).json("Chỉ có thể cập nhật thông báo của bạn");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
