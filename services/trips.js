const db = require('./db');
const helper = require('../helper');
const config = require('../config');
// These functions represent application-centric tasks whereas
// the functions in our services module handle the management of HTTP requests and responses
async function getTrips(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    
    const rows = await db.query(
        `SELECT id, name, userId 
        FROM trip LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    }

    // return {"data":[{"id":1,"name":"JavaScript","released_year":1995,"githut_rank":1,"pypl_rank":3,"tiobe_rank":7},{"id":2,"name":"Python","released_year":1991,"githut_rank":2,"pypl_rank":1,"tiobe_rank":3},{"id":3,"name":"Java","released_year":1995,"githut_rank":3,"pypl_rank":2,"tiobe_rank":2},{"id":4,"name":"TypeScript","released_year":2012,"githut_rank":7,"pypl_rank":10,"tiobe_rank":42},{"id":5,"name":"C#","released_year":2000,"githut_rank":9,"pypl_rank":4,"tiobe_rank":5},{"id":6,"name":"PHP","released_year":1995,"githut_rank":8,"pypl_rank":6,"tiobe_rank":8},{"id":7,"name":"C++","released_year":1985,"githut_rank":5,"pypl_rank":5,"tiobe_rank":4},{"id":8,"name":"C","released_year":1972,"githut_rank":10,"pypl_rank":5,"tiobe_rank":1},{"id":9,"name":"Ruby","released_year":1995,"githut_rank":6,"pypl_rank":15,"tiobe_rank":15},{"id":10,"name":"R","released_year":1993,"githut_rank":33,"pypl_rank":7,"tiobe_rank":9}],"meta":{"page":1}}
}

async function createTrip(tripData){
    try {
        // Validate required fields
        if (!tripData.name || !tripData.userId) {
          return { 
            error: true, 
            message: 'Name and userId are required fields' 
          };
        }

        const result = await db.query(
            `INSERT INTO trip 
                (name, userId)
                VALUES 
                (?, ?)`,
            [tripData.name, tripData.userId]
        );

        let message = 'Error creating trip';
    
        if (result.affectedRows) {
        message = 'Trip created successfully';
        return {
            data: {
                id: result.insertId,
                name: result.name,
                userId: result.userId
            },
            message
        };
    }
    return { error: true, message };
  } catch (error) {
    console.error('createTrip error:', error.message);
    return { error: true, message: error.message };
  }
}

async function deleteTrip(tripId) {
    try {
      const result = await db.query(
        `DELETE FROM trip WHERE id = ?`,
        [tripId]
      );
  
      let message = 'Error deleting trip';
      if (result.affectedRows) {
        message = 'Trip deleted successfully';
      } else {
        message = 'Trip not found';
      }
  
      return { message };
    } catch (error) {
      console.error('deleteTrip error:', error.message);
      return { error: true, message: error.message };
    }
  }
  

module.exports = {
    getTrips,
    createTrip,
    deleteTrip
    // updateTrip, 
}