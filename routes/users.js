const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* check user */
router.post('/', async function(req, res, next) {
  try {
    let userData = req.body;
    
    const result = await users.validateUser(userData);
    if (result.error) {
        return res.status(400).json(result);
    }
    // Return success response
    res.status(201).json(result);
  } catch (err) {
      console.error(`Error while logging in `, err.message);
      next(err);
  }
});

module.exports = router;
