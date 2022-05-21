const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors')
const authRoute = require("./routes/auth");

const router = express.Router();
const path = require("path");

dotenv.config();

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true})   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({origin: true, credentials: true}));

app.use("/api/auth", authRoute);



app.listen(3000, () => {
    console.log("Backend server is running!");
});