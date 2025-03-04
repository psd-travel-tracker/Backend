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

// TODO: Our post to create a new trip. The json that's returned should contain a link to the new trip i.e. 
// returns the TripId of the new trip so the user can see
router.post('/', async function(req, res, next) {
    try {
        // Extract the pertinent info from req to pass as an object to createTrip
        // Refer to express docs to see how to pass the necessary info from req
        res.json(await currentTrips.createTrip());
    } catch (err) {
        console.error(`Error while getting current trips `, err.message);
        next(err);
    }
});
module.exports = router;