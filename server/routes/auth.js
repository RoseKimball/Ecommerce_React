const express = require('express')

const router = express.Router()

//middlewares
const { authCheck } = require("../middlewares/auth");

//controller
const { createOrUpdateUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser)

// router.post('/create-or-update-user', (req, res, next) => {
//     console.log(req.headers); //token
//     next();
// }, createOrUpdateUser
// )

module.exports = router;