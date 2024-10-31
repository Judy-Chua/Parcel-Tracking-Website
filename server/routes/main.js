const express = require('express');
const path = require('path');
const router = express.Router();

router.get('', async (req, res) =>{
    res.render('index', {title: "Home Page", css:"about_us"});
})

router.get('/branches', async (req, res) =>{
    res.render('branches', {title: "Branches | ESMC", css: "branches_big"});
})

router.get('/contact_us', async (req, res) =>{
    res.render('contact_us', {title: "Contact Us | ESMC", css: "contact_us_big"});
})

module.exports = router;