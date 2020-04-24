
var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */



function getHomepage(req, res) {
  var query = `
  Select n.company,d.revenue from data_2018 d JOIN nasdaq_list n
on d.ticker = n.ticker
ORDER BY revenue DESC
LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};

function getHomepageSecond(req, res) {
  var query = `
  SELECT c.company,n.date, n.open, n.high, n.low,n.close
from nasdaq_historical_prices_daily n JOIN nasdaq_list c ON c.ticker = n.ticker
WHERE company = "Apple" and date ="2020-02-03";
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
};


/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {

  var name = req.params.movieName;

  var query = `

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });

};


/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {

  var decade = Number(req.params.d);
  var query = `
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
	getRecs: getRecs,
  bestGenresPerDecade: bestGenresPerDecade
}
