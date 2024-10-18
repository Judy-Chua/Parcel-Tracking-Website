const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../models/User.js');
const Order = require('../models/Order.js');
const Update = require('../models/Update.js');


router.get('/', async (req, res) =>{
    res.render('tracker', {title: "Track your Package"});
})

router.post('/', async (req, res) =>{
    try {
        const { id } = req.body;
        const trackerId = await Order.findOne({ orderId: id });
        if (trackerId && trackerId.status != "FINISHED") {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ exists: false });
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id;
    console.log(id);
    try {
        const order = await Order.findOne({ orderId: id });
        if (!order) {
            return res.status(404).render('error', { message: 'Order not found' });
        }
        res.render('results', {title: "Progress About Your Parcel", 
                               trackerId: order.orderId, 
                               status: order.status, 
                               estDate: order.arrivalDate, 
                               branch: order.originBranch});
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})

router.get('/:id/more-details', async (req, res) =>{
    const id = req.params.id;
    console.log(id);
    try {
        const order = await Order.findOne({ orderId: id });
        if (!order) {
            return res.status(404).render('error', { message: 'Order not found' });
        }

        var allUpdates = [];
        for (var i = order.updates.length - 1; i >= 0; i--) {
            const update = await Update.findOne({ updateId : order.updates[i]});
            const addUpdate = {
                title: update.status,
                date: update.updateDate,
                time: update.updateTime,
                description: update.statusDesc
            };
            allUpdates.push(addUpdate);
        }
        res.render('details', {title: "Parcel Details", 
                               id: order.orderId, 
                               estDate: order.arrivalDate, 
                               update: allUpdates});
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})

module.exports = router;

    