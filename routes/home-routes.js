const express = require("express");
const router = express.Router();
const authmiddleware = require('../middleware/auth-middleware');


router.get('/welcome', authmiddleware, (req,res)=>{
    const {username, userId, role} = req.userInfo;
    res.json({
        message: "welcome to the home page",
        user: {
            _id: userId,
            username,
            role
        }
    })
});

module.exports = router;


// const express = require("express");
// const router = express.Router(); // ✅ Correct way to create a router

// // Home route
// router.get('/welcome', (req, res) => {
//     res.json({
//         message: "Welcome to the home page"
//     });
// });

// module.exports = router; // ✅ Export router properly
