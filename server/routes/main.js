const express = require('express');
const path = require('path');
const router = express.Router();


router.get('', async (req, res) =>{
    res.render('index', {title: "Home Page"});
})

router.get('/info', async (req, res) =>{
    res.render('info', {title: " Information Page"});
})

router.get('/about', async (req, res) =>{
    res.render('about', {title: "About Us"});
})

router.get('/contact', async (req, res) =>{
    res.render('contact', {title: "Contact Us"});
})

module.exports = router;