// const { request } = require("express");


// const isAdminUser = (req,res, next)=>{
//     if(req.userInfo.role !== 'admin'){
//       return res.status(403).json({
//         success: false,
//         message: "Admin Denite! Admin rights require"
//       })
//     }

//     next();

// }


// module.exports = isAdminUser;


const isAdminUser = (req, res, next) => {
  if (!req.userInfo || req.userInfo.role?.toLowerCase() !== 'admin') {
    return res.status(403).json({
      success: false,
      message: "Access Denied! Admin rights required"
    });
  }

  next();
};

module.exports = isAdminUser;
