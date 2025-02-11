const express = require('express');
const router = express.Router();
const currentTrips = require('../services/trips');
/* GET trips. */
// This connects my trips route (api that returns json vs view which is what the user sees)
router.get('/', async function(req, res, next) {
    try {
        res.json(await currentTrips.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting current trips `, err.message);
        next(err);
    }
});
module.exports = router;