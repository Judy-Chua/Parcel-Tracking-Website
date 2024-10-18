const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../models/User.js');
//const Order = require('../models/Order.js');
//const Update = require('../models/Update.js');

/* SUMMARY OF ORDERS */
router.get('/view-orders', async (req, res) =>{
    res.render('view', {title: "Summary of Orders"});
})

/* ADD ORDER */
router.get('/order', async (req, res) =>{
    res.render('order', {title: "Order Form"});
})

router.post('/add-order', async (req, res) =>{
    res.json({ success: true });
    res.json({ success: false });
})

/* UPDATE ORDERS */

module.exports = router;