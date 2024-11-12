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

router.post('/view-order/more-details', async (req, res) => {
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
              itemNum, itemDesc, itemPrice, 
              transDate, originBranch, destBranch,
              initialCharge, discount, total, 
              status, arrivalDate, updates} = req.body;
        var intSenderNum = parseInt(senderNum);
        var intReceiverNum = parseInt(receiverNum);
        var floatCharge = parseFloat(initialCharge);
        var floatDiscount = parseFloat(discount);
        var floatTotal = parseFloat(total);
        var addOrder = new Order({
            orderId : orderId,
            senderName : senderName,
            receiverName : receiverName,
            senderNum : intSenderNum,
            receiverNum : intReceiverNum,

            itemDesc : itemDesc,
            itemNum : itemNum,
            itemPrice : itemPrice,
        
            transDate : transDate,
            originBranch : originBranch,
            destBranch : destBranch,

            initialCharge : floatCharge,
            discount : floatDiscount,
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

router.post('/validate', async (req, res) =>{
    try {
        var { number } = req.body;
        var num = parseInt(number);
        var notExisting = true;
        const allOrders = await Order.find({}, { orderId: 1, _id: 0 });
        
        for (var i = 0; i < allOrders.length; i++) {
            var current = allOrders[i].orderId;
            var extract = current.substring(3);   //extract the number part
            var compare = parseInt(extract);

            if(compare == num) {
                notExisting = false;
                break;
            }
        }

        res.json({ success: notExisting });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
        //res.json({ success: false });
    }
    
})

/* === */

/* EDIT ORDERS */
router.get('/edit-order/:orderId', async (req, res) =>{
    const order = req.params.orderId;
    const specificOrder = await Order.findOne({ orderId: order});

    orderDetails = {
        senderName: specificOrder.senderName,
        receiverName: specificOrder.receiverName,
        senderNum: specificOrder.senderNum,
        receiverNum: specificOrder.receiverNum,

        itemDesc: specificOrder.itemDesc,
        itemNum: specificOrder.itemNum,
        itemPrice: specificOrder.itemPrice,

        transDate: specificOrder.transDate,
        originBranch: specificOrder.originBranch,
        destBranch: specificOrder.destBranch,

        initialCharge: specificOrder.initialCharge,
        discount: specificOrder.discount,
        total: specificOrder.total
    }

    res.render('edit_order', { layout: "admin.hbs", title: "Edit Order | ESMC", css: "edit_order_big",
                               orderDetails: orderDetails});
})
/* === */

/* UPDATE ORDERS */

/* === */

module.exports = router;