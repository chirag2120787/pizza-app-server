var express = require('express');
var router = express.Router();
var OrderController = require('../controllers/orders')

/* POST orders create. */
router.post('', OrderController.createOrder);

module.exports = router;