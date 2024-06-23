const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

// @route GET /api/items
// @desc Get all items
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route POST /api/items
// @desc Create an item
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description
    });

    newItem.save().then(item => res.json(item));
});

// @route DELETE /api/items/:id
// @desc Delete an item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route PUT /api/items/:id
// @desc Update an item
router.put('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.name = req.body.name;
            item.description = req.body.description;
            item.save().then(() => res.json(item));
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
