const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../models/User.js');
const Order = require('../models/Order.js');
//const Update = require('../models/Update.js');


router.get('', async (req, res) =>{
    res.render('tracker', {title: "Track your Package"});
})

router.post('/check-tracker', async(req, res) => {
    const { id } = req.body;
    
    console.log(id);

    try {
        const trackerId = await Order.findOne({ orderId: id });
        console.log(trackerId);
        if (trackerId) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ exists: false });
    }
})

module.exports = router;