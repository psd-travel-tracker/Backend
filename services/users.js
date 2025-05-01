const bcrypt = require('bcrypt');
const db = require('./db');
const helper = require('../helper');

async function validateUser(userData) {
    try {
        if (!userData.email) {
            return { error: true, message: 'Email is a required field' };
        }
        if (!userData.password) {
            return { error: true, message: 'Password is a required field' };
        }
        
        const rows = await db.query(
            `SELECT id, name, email, password
             FROM user
             WHERE email = ?`,
            [userData.email]
        );
        
        const data = helper.emptyOrRows(rows);
        
        // Check if user exists
        if (data.length === 0) {
            return { error: true, message: 'User not found' };
        }
        
        const user = data[0];

        // TODO: Creating password
        // Use bcrypt.compare with await
        // let userPassword;
        // const saltRounds = 10;
        // bcrypt.hash(userData.password, saltRounds, (err, hash) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     console.log('Hashed password:', hash);
        //     userPassword = hash;
        // });
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        
        if (passwordMatch) {
            return {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                message: 'Login successful'
            };
        } else {
            return { error: true, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('validateUser error:', error.message);
        return { error: true, message: error.message };
    }
}

module.exports = {
    validateUser,
}