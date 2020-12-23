const express = require('express');

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const { create, listAll, remove, read, update } = require('../controllers/product');

//routes
router.post('/', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.delete('/:slug', authCheck, adminCheck, remove);
router.get('/:slug', read)
router.put('/:slug', authCheck, adminCheck, update)

module.exports = router;