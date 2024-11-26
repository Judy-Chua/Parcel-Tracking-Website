const express = require('express');
const path = require('path');
const router = express.Router();

const Order = require('../models/Order.js');
const Update = require('../models/Update.js');


router.get('/', async (req, res) =>{
    res.render('search_parcel', {title: "Search | ESMC", css:"search_parcel"});
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
        res.render('search_results', {title: "Search Results | ESMC", 
                                      css:"search_results", 
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
            var [month, day, year] = update.updateDate.split('-');
            var dateStr = toMonthStr(parseInt(month)) + day + ", " + year;

            const addUpdate = {
                title: update.status,
                date: dateStr,
                time: update.updateTime,
                description: update.statusDesc
            };
            allUpdates.push(addUpdate);
        }

        var orderStatus = order.status
        var progressClass = ""
        
        if(orderStatus === "PROCESSING"){
            progressClass = "progress1"
        } else if(orderStatus === "IN TRANSIT"){
            progressClass = "progress2"
        } else if(orderStatus === "READY FOR PICKUP"){
            progressClass = "progress3"
        } else if(orderStatus === "DELIVERED"){
            progressClass = "progress4"
        }

        res.render('details', {title: "Parcel Details",
                               css:"details", 
                               id: order.orderId,
                               progress: progressClass, 
                               estDate: order.arrivalDate, 
                               update: allUpdates});
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
})

module.exports = router;

//Helper functions
function toMonthStr(number) {
    switch (number) {
        case 1:
            return "January ";
        case 2:
            return "February ";
        case 3:
            return "March ";
        case 4:
            return "April ";
        case 5:
            return "May ";
        case 6:
            return "June ";
        case 7:
            return "July ";
        case 8:
            return "August ";
        case 9:
            return "September ";
        case 10:
            return "October ";
        case 11:
            return "November ";
        case 12:
            return "December ";
        default:
            return "Error "; //unlikely but will still put
    }
}
    