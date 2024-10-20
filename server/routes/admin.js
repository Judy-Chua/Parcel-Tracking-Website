const express = require('express');
const path = require('path');
const router = express.Router();

//const User = require('../models/User.js');
const Order = require('../models/Order.js');
//const Update = require('../models/Update.js');

/* LOGIN */
router.get('/', async (req, res) =>{
    res.render('login', {layout: "login.hbs", title: "Login | ESMC", css:"login_big"});
})

router.get('/login', async (req, res) =>{
    res.render('login', {layout: "login.hbs", title: "Login | ESMC", css:"login_big"});
})

/* === */

/* SUMMARY OF ORDERS */
router.get('/view-orders', async (req, res) =>{
    try {
        const orders = await Order.find();
        res.render('view_database', { layout: "admin.hbs", title: "Search | ESMC", css: "view_database_big", orders: orders });
    }
    catch (error)
    { 
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

router.get('/view_order=:id/more-details', async (req, res) => {
    try {
        const id = req.params.id
        const orderDetails = await Order.findOne({ orderId: id });
        res.render('view_details', { layout: "admin.hbs", title: "Search | ESMC", css: "view_database_big", orderDetails: orderDetails });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

router.get('/edit-order=:id', async (req, res) => {
    try {
        const id = req.params.id
        const orderDetails = await Order.findOne({ orderId: id });
        res.render('edit_order', { layout: "admin.hbs", title: "Search | ESMC", css: "view_database_big", orderDetails: orderDetails });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

router.post('/edit-order=:id', async (req, res) => {
    const editedOrder = Order.findOneAndUpdate(
        { orderId: req.params.id },
        { status: req.body.newStatus, arrivalDate: req.body.newEDA, originBranch: req.body.newOrigin },
        { new: true }
    );
    console.log(editedOrder)
})

/* === */

/* ADD ORDER */
router.get('/create-order', async (req, res) =>{
    res.render('order', {title: "Order Form"});
})

router.post('/add-order', async (req, res) =>{
    try {
        var { orderId, senderName, receiverName, senderNum, receiverNum,
              itemDesc, itemNum, transDate, originBranch, destBranch,
              total, status, arrivalDate, updates} = req.body;
        var intSenderNum = parseInt(senderNum);
        var intReceiverNum = parseInt(receiverNum);
        var floatTotal = parseFloat(total);
        var addOrder = new Order({
            orderId : orderId,
            senderName : senderName,
            receiverName : receiverName,
            senderNum : intSenderNum,
            receiverNum : intReceiverNum,
            itemDesc : itemDesc,
            itemNum : itemNum,
            transDate : transDate,
            originBranch : originBranch,
            destBranch : destBranch,
            total : floatTotal,
            status : status,
            arrivalDate : arrivalDate,
            updatedBy : "---",         //wait for session
            updates : updates  
        });

        await addOrder.save();
        console.log('Order saved:', addOrder);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
        res.json({ success: false });
    }
    
})

/* === */

/* UPDATE ORDERS */

/* === */

module.exports = router;