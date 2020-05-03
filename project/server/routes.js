
var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */



function getHomepage(req, res) {
  var query = `
  Select n.company, d.revenue,d.Revenue_Growth, d.Gross_Profit from data_2018 d JOIN company n
on d.ticker = n.ticker
ORDER BY revenue DESC
LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getRecs(req, res) {
  var query = `
  SELECT Distinct a.company, b.date,b.high,b.low
  From (Select n.ticker, n.company, d.revenue from data_2018 d JOIN company n
  on d.ticker = n.ticker
  ORDER BY revenue DESC
  LIMIT 10) a join nasdaq_historical_prices_daily b
  ON a.ticker = b.ticker
  Order by date DESC
  Limit 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function need(req, res) {
  var query = `
  SELECT "2020-02-03";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};
// The exported functions, which can be accessed in index.js.
module.exports = {
	getHomepage: getHomepage,
	getRecs:getRecs,
  need:need
}
