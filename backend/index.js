const express=require('express');
const conncectDb = require('./db/conncectDb');
const app=express();
const authRoute=require('./routes/auth_route')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const cors=require('cors')

dotenv.config();
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use('/auth',authRoute)

const PORT=process.env.PORT || 3000
app.listen(PORT,() => {
    conncectDb();
    console.log("Started");
})