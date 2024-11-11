const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/User.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const Sessions = require('../models/Sessions.js');


//const User = require('../models/User.js');
const Order = require('../models/Order.js');
//const Update = require('../models/Update.js');

checkAuthenticated = (req,res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/admin/login');
}

/* LOGIN */
router.get('/', async (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect('/admin/view-orders')
    }
    res.render('login', {layout: "login.hbs", title: "Login | ESMC", css:"login_big"});
})

router.get('/login', async (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect('/admin/view-orders')
    }
    res.render('login', {layout: "login.hbs", title: "Login | ESMC", css:"login_big"});
})


router.post('/login', passport.authenticate('local', { successRedirect : '/admin/view-orders', failureRedirect : '/admin/login' }), function(req, res, next){
    console.log("ENTERED!");
    res.redirect('/admin/view-orders');
});

/* === */

/* SUMMARY OF ORDERS */
router.get('/view-orders', checkAuthenticated , async (req, res) =>{
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

router.post('/view-order/more-details', checkAuthenticated,  async (req, res) => {
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

router.post('/edit-order', checkAuthenticated, async (req, res) => {
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
router.get('/create-order', checkAuthenticated, async (req, res) =>{
    res.render('order_form', {layout: "admin.hbs", title: "Order Form", css:"order_form_big"});
})

router.post('/add-order', checkAuthenticated,    async (req, res) =>{
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