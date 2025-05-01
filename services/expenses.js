const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getExpenses(tripId, page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT id, name, description, cost, categoryId, tripId
        FROM expense WHERE tripId = ${tripId} LIMIT ${offset},${config.listPerPage}`,
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }
}

async function createExpense(expenseData){
    try {
        // Validate required fields
        if (!expenseData.name) {
          return { 
            error: true, 
            message: 'Name is a required field' 
          };
        }
        console.log(expenseData)
        const result = await db.query(
            `INSERT INTO expense 
                (name, description, cost, tripId, categoryId,userId)
                VALUES 
                (?, ?, ?, ?,?,?)`,
            [
                expenseData.name,
                expenseData.description,
                Number(expenseData.cost),
                Number(expenseData.tripId),
                Number(expenseData.categoryId),
                Number(expenseData.userId)
            ]
        );

        let message = 'Error creating expense';
    
        if (result.affectedRows) {
        message = 'Expense created successfully';
        return {
            data: {
                id: result.insertId,
                name: result.name,
                description: result.description,
                cost: result.cost,
                tripId: result.tripId
            },
            message
        };
    }
    return { error: true, message };
  } catch (error) {
    console.error('createExpense error:', error.message);
    return { error: true, message: error.message };
  }
}

module.exports = {
    getExpenses,
    createExpense
}
