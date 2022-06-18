const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const router = require("express").Router();
const User = require("../models/User");

dotenv.config();
//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      fullname: req.body.fullname,
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
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



//Service email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SECRET,
    pass: process.env.PASS_SECRET,
  },
});

// trực tiếp gửi mail
const sendMail = (subject,text, receiver) => {
  transporter.sendMail({
    from: process.env.EMAIL_SECRET,
    to: receiver,
    subject: subject,
    text: text,
  }, function (err, info) {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log("Email sent");
    }
  });
}

// tạo mã
const createCode = () => {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for(let i=0; i<5; i++) {
   let pos = Math.floor(Math.random()*givenSet.length);
   code += givenSet[pos];
  }
  return code;
}

// xử lí gửi mail
const handleSendmail = async (req,res,next) =>{
  let code = createCode();
  let receiver = req.body.email;

  try {
    const user = await User.findOne({email: receiver});
    if(user){
      sendMail(
        'Đặt lại mật khẩu',
        `Mật khẩu của bạn là ${code}. Hãy đổi mật khẩu sau khi đăng nhập`,
        receiver
      )
      req.pass = code;
      next();
    }else{
      res.status(500).json({message: 'Người dùng không tồn tại'});
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

//RESET PASSWORD
router.put("/resetpassword", handleSendmail, async (req, res) => {
  const newPass = req.pass;
  console.log(newPass);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPass, salt);

  try {
    //update password
    const user = await User.findOne({email: req.body.email});
    await user.updateOne({password: hashedPassword});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CHANGE PASSWORD
router.put("/changepassword", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let newpassword = req.body.newpassword;
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

//Save codeConfirm
router.put("/savecode", async (req,res)=>{
  const code = createCode();
  // send email
  sendMail(
    "Xác minh tài khoản",
    `Mã xác nhận của bạn là ${code}.`,
    req.body.email
  )
  // update code trong user
  try {
    User.findOneAndUpdate({email: req.body.email}, { code: code }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(docs);
      }
    });
  }catch (e){
    res.status(500).json(e);
  }
})

module.exports = router;