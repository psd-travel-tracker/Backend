const express = require('express');
const router = express.Router();
const tripExpenses = require('../services/expenses');

router.get('/', async function(req, res, next) {
    try {
        const tripId = req.query.tripId;
        if (!tripId) {
            throw new Error('tripId is required');
        }
        res.json(await tripExpenses.getExpenses(tripId, req.query.page));
    } catch (err) {
        console.error(`Error while getting expenses for this trip `, err.message);
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
      const expenseId = req.params.id;
      const result = await currentTrips.deleteTrip(expenseId);
      if (result.error) {
        return res.status(500).json(result);
      }
      res.json(result);
    } catch (err) {
      console.error(`Error while deleting expense`, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
    try {
        let expenseData = req.body;
        expenseData.tripId = req.query.tripId
        // Extract the pertinent info from req to pass as an object to createExpense
        // Refer to express docs to see how to pass the necessary info from req
        console.log(expenseData);
        const result = await tripExpenses.createExpense(expenseData);
        if (result.error) {
            return res.status(400).json(result);
        }
        // Return success response
        res.status(201).json(result);
    } catch (err) {
        console.error(`Error while creating a new expense `, err.message);
        next(err);
    }
});
module.exports = router; 