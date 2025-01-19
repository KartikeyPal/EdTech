const express =  require("express");
const app = express();

const userRoutes = require('./routes');
const profileRoutes = require('./routes');
const courseRoutes = require('./routes');
const paymentRoutes = require('./routes');

const database = require('./config/database');
const cookieParser = require('./cookie-parser')
const cors = require('cors');
const {cloudinaryConnect} = require('./config/database')
const fileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

//database conncect
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connection
cloudinaryConnect();

//routes
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/course',courseRoutes);
app.use('/api/v1/payment',paymentRoutes);


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message: "Your server is running"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})



