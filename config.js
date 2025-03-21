const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        port: 3308,
        user: "root",
        password: "password",
        database: "psd",
        connectTimeout: 60000,
    },
    listPerPage: 100,
};
module.exports = config;