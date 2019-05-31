//configure the database
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'shoe_store',
    host: 'localhost',
    port: 5432,
};
const pool = new Pool(config);

module.exports = pool;