const express = require('express');
const router = express.Router();

const {provider} = require('../models/provider');
const moment = require('moment');

//Save Provider Route
router.post('/saveprovider', (req, res) => {

    const data = req.body.provider;
    
    let newProvider = new provider({
        company: data.company,
        address: data.address,
        contact: data.contact,
        mobile: data.mobile,
        email: data.email,
        phone: data.phone,
        createdAt: moment().valueOf()
    });

    newProvider.save().then((provider)=>{
        res.status(200).send(provider);
    },(err)=>{
        res.status(400).send(err);
    });
});

//Get all Providers Route
router.get('/getproviders', (req,res) => {
    provider.find().then((allProviders) => {
        res.send({allProviders})
    },(err) => {
        res.status(400).send(err);
    })
});

//Delete Provider
router.delete('/delete/:id', (req, res) => {
    provider.findByIdAndDelete(req.params.id).then((provider)=>{
        console.log(provider);
        res.status(200).send({provider});
    },(err)=>{
        res.status(400).send(err);
    })
})

//Edit Provider
router.post('/edit/:id', (req, res) => {
    const data = req.body.provider;
    provider.findByIdAndUpdate(req.params.id).update({
        company: data.company,
        address: data.address,
        contact: data.contact,
        mobile: data.mobile,
        email: data.email,
        phone: data.phone,
    }).then((provider)=>{
        res.status(200).send({provider});
    },(err)=>{
        res.status(400).send(err);
    })
})

// Select One Provider
router.get('/:id', (req, res) => {
    provider.findById(req.params.id)
    .then((provider)=>{
        res.status(200).send({provider});
    },(err)=>{
        res.status(400).send(err);
    })
})

module.exports = router;