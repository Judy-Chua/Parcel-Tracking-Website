const express = require('express');
const path = require('path');
const router = express.Router();


router.get('', async (req, res) =>{
    res.render('index', {title: "Home Page"});
})

router.get('/contact_us', async (req, res) =>{
    res.render('contact_us', {title: "Contact Us | ESMC", css: "contact_us_big"});
})

router.get('/search_parcel', async (req, res) =>{
    res.render('search_parcel', {title: "Search | ESMC", css:"search_parcel_big"});
})

router.get('/search_results', async (req, res) =>{
    res.render('search_results', {title: "Order Now | ESMC", css:"search_results_big"});
})

router.get('/view_database', async (req, res) =>{
    res.render('view_database', {layout: "admin.hbs", title: "Search | ESMC", css:"view_database_big"});
})

router.get('/login', async (req, res) =>{
    res.render('login', {layout: "login.hbs", title: "Login | ESMC", css:"login_big"});
})

module.exports = router;