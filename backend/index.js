const express=require('express');
const conncectDb = require('./db/conncectDb');
const app=express();
const authRoute=require('./routes/auth_route')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')

dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use('/auth',authRoute)

const PORT=process.env.PORT || 3000
app.listen(PORT,() => {
    conncectDb();
    console.log("Started");
})