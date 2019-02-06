const express = require('express');
const router = express.Router();
const moment = require('moment');

const {element} = require('../models/element');

//Save Item Route
router.post('/saveitem', (req, res) => {
    const data = req.body.item;

    let newItem = new element({
        description : data.description,
        provider : data.provider,
        providerId : data.providerId,
        units : data.units,
        min : data.min,
        max: data.max,
        type: data.type,
        stock: data.stock,
        createdAt: moment().valueOf()
    });

    newItem.save()
    .then((item)=>{
        res.status(200).send(item);
    },(err)=>{
        res.status(400).send(err);
    });
});

//Get all Items Route
router.get('/getitems', (req, res)=>{
    element.find().then((items)=>{
        res.status(200).send({items});
    },(err)=>{
        res.status(400).send(err);
    });
});

//Delete Item Route
router.delete('/delete/:id', (req, res)=>{
    element.findByIdAndDelete(req.params.id).then((item)=>{
        res.status(200).send({item});
    },(err)=>{
        res.status(400).send(err);
    });
});

router.post('/edit/:id', (req, res) => {
    const data = req.body.item;
    element.findByIdAndUpdate(req.params.id).update({
        description : data.description,
        provider : data.provider,
        providerId : data.providerId,
        units : data.units,
        min : data.min,
        max: data.max,
        type: data.type,
        stock: data.stock,
    }).then((item)=>{
        res.status(200).send({item});
    },(err)=>{
        res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
    element.findById(req.params.id)
    .then((item)=>{
        res.status(200).send({item});
    },(err)=>{
        res.status(400).send(err);
    })
})

module.exports = router;