
const authmiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

const express = require("express");

const router = express.Router();

router.get('/welcome', authmiddleware, adminMiddleware, (req, res)=>{
    res.json({
        message: "Welcome to the admin page"
    })
})


module.exports = router;