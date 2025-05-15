const express =  require("express");
const app = express();

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contact = require('./routes/contact');

const database = require('./config/database');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

//database connection
database.connect();
//M|iddlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5173",
        // origin:"https://edtech-glfo.onrender.com",
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
app.use('/api/v1/reach',contact)


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message: "Your server is running"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

