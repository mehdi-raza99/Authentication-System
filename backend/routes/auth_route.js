const express=require('express');
const { signup,verifyEmail, logout, login, checkAuth } = require('../controllers/auth_controller');
const { User } = require('../models/user');
const { verifyToken } = require('../middleware/verifyToken');
const router=express.Router();


router.get('/',verifyToken,checkAuth)
router.post('/signup', signup)
router.post('/verify-email', verifyEmail)

router.post('/login', login)

router.post('/logout', logout)

module.exports=router;