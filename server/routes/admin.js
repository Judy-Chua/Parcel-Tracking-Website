const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../models/User.js');
//const Order = require('../models/Order.js');
//const Update = require('../models/Update.js');

router.get('/order', async (req, res) =>{
    res.render('order', {title: "Order Form"});
})

module.exports = router;