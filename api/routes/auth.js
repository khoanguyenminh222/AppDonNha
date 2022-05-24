const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const router = require("express").Router();
const User = require("../models/User");
const { route } = require("express/lib/application");

dotenv.config();
//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("email không tìm thấy");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("sai mật khẩu");
    console.log(validPassword);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Sercice email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SECRET,
    pass: process.env.PASS_SECRET,
  },
});

//RESET PASSWORD
router.put("/resetpassword", async (req, res) => {
  let to = await req.body.email;
  let mailOption = {
    from: process.env.EMAIL_SECRET,
    to: to,
    subject: "Reset pasword",
    text: `Mật khẩu của bạn là ${process.env.RESET_PASS}. Hãy đổi mật khẩu sau khi đăng nhập`,
  };
  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log("Email sent");
    }
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(process.env.RESET_PASS, salt);
  try {
    //update password
    User.findOne({ email: to }, (error, doc) => {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        if (!doc) {
          res.status(404).json("email không tồn tại");
        } else {
          doc.password = hashedPassword;
          doc.save((err, updateObject) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              res.status(200).json(updateObject);
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//CHANGE PASSWORD
router.put("/changepassword", async (req, res) => {
  let email = await req.body.email;
  let password = await req.body.password;
  let newpassword = await req.body.newpassword;
  try {
    const user = await User.findOne({ email: email });
    !user && res.status(404).json("email không tìm thấy");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("sai mật khẩu");

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    //thay đổi password
    user.password = hashedPassword;
    console.log(hashedPassword);
    //lưu lại user
    let saveUser = await user.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
