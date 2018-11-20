var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_siom',
  password        : '3150',
  database        : 'cs361_siom'
});
module.exports.pool = pool;