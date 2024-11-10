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

/* FOR DEBUGGING ONLY, replace as needed*/
router.get('/edit-order', async (req, res) =>{
    res.render('edit_order', { layout: "admin.hbs", title: "Edit Order | ESMC", css: "edit_order_big"});
})
/* === */


/* SUMMARY OF ORDERS */
router.get('/view-orders', async (req, res) =>{
    try {
        const orders = await Order.find();
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders });
    }
    catch (error)
    { 
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

router.post('/view-orders/more-details', async (req, res) => {
    try {
        const { id } = req.body
        const orderDetails = await Order.findOne({ orderId: id });
        res.json({ orderDetails: orderDetails });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

router.get('/view-orders/control-id', async (req, res) => {
    try {
        const controlId = req.query.controlId;
        const orders = await Order.find({ "orderId": {$regex : controlId} });
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
});

router.get('/view-orders/hub-to-hub', async (req, res) => {
    try {
        const originSearch = req.query.originSearch;
        const destSearch = req.query.destSearch;
        const orders = await Order.find({
            "originBranch": { $regex: originSearch },
            "destBranch": { $regex: destSearch }
        });
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
});

router.get('/view-orders/daily-net', async (req, res) => {
    try {
        const daySearch = req.query.daySearch;
        const orders = await Order.find({
            "transDate": { $regex: daySearch }
        });
        const dailyNet = await Order.aggregate([
            {
                $match: {
                    transDate: { $regex: daySearch }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$total' }
                }
            }
        ]);
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders, net: dailyNet[0].totalSum });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
});

router.get('/view-orders/monthly-net', async (req, res) => {
    try {
        const monthSearch = req.query.monthSearch;
        const orders = await Order.find({
            "transDate": { $regex: monthSearch }
        });
        const monthlyNet = await Order.aggregate([
            {
                $match: {
                    transDate: { $regex: monthSearch }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$total' }
                }
            }
        ]);
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders, net: monthlyNet[0].totalSum });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
});

router.get('/view-orders/annual-net', async (req, res) => {
    try {
        const yearSearch = req.query.yearSearch;
        const orders = await Order.find({
            "transDate": { $regex: yearSearch }
        });
        const annualNet = await Order.aggregate([
            {
                $match: {
                    transDate: { $regex: yearSearch }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSum: { $sum: '$total' }
                }
            }
        ]);
        res.render('view_database', { layout: "admin.hbs", title: "View Orders | ESMC", css: "view_database_big", orders: orders, net: annualNet[0].totalSum });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
});

router.post('/edit-order', async (req, res) => {
    try {
        const { id } = req.body;
        const { newStatusEdit } = req.body;
        const { newEDAEdit } = req.body;
        const { newOriginEdit } = req.body;
        const newDoc = await Order.findOneAndUpdate(
            { orderId: id },
            {
                status: newStatusEdit,
                arrivalDate: newEDAEdit,
                originBranch: newOriginEdit
            },
            { new: true }
        );
        console.log(newDoc)
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).send("Server Error");
    }
})

/* === */

/* ADD ORDER */
router.get('/create-order', async (req, res) =>{
    res.render('order_form', {layout: "admin.hbs", title: "Order Form", css:"order_form_big"});
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