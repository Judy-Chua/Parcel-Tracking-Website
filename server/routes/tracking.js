const express = require('express');
const path = require('path');
const router = express.Router();

const Order = require('../models/Order.js');
const Update = require('../models/Update.js');


router.get('/', async (req, res) =>{
    res.render('search_parcel', {title: "Search | ESMC", css:"search_parcel_big"});
})

router.post('/', async (req, res) =>{
    try {
        const { id } = req.body;
        const trackerId = await Order.findOne({ orderId: id });
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

router.get('/track=:id', async (req, res) =>{
    const id = req.params.id;
    console.log(id);
    try {
        const order = await Order.findOne({ orderId: id });
        if (!order) {
            return res.status(404).render('error', { message: 'Order not found' });
        }
        res.render('search_results', {title: "Order Now | ESMC", 
                                      css:"search_results_big", 
                                      trackerId: order.orderId, 
                                      status: order.status, 
                                      estDate: order.arrivalDate, 
                                      branch: order.originBranch});
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})

router.get('/track=:id/more-details', async (req, res) =>{
    const id = req.params.id;
    try {
        const order = await Order.findOne({ orderId: id });
        if (!order) {
            return res.status(404).render('error', { message: 'Order not found' });
        }

        var allUpdates = [];
        for (var i = order.updates.length - 1; i >= 0; i--) {
            const update = await Update.findOne({ updateId : order.updates[i]});
            var updateTitle = getUpdateTitle(update.status);

            const addUpdate = {
                title: updateTitle,
                date: update.updateDate,
                time: update.updateTime,
                description: update.statusDesc
            };
            allUpdates.push(addUpdate);
        }
        res.render('details', {title: "Parcel Details",
                               css:"details", 
                               id: order.orderId, 
                               estDate: order.arrivalDate, 
                               update: allUpdates});
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})

module.exports = router;





//Helper functions
function getUpdateTitle(status) {
    switch (status) {
        case "PROCESSING":
            return "The order has been received and is being prepared for shipment";
        case "IN TRANSIT":
            return "The package is on its way to the destination";
        case "READY FOR PICKUP":
            return "The package is available at a local facility for the recipient to pick up";
        case "DELIVERED":
            return "The package has been successfully delivered or claimed to the recipient.";
        default:
            return "Status unknown"; //unlikely but will still put
    }
}
    