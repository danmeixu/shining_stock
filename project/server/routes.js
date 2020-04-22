var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getHomepage(req, res) {

  var query = `
  Select n.company,d.revenue from data_2018 d JOIN nasdaq_list n
on d.ticker = n.ticker
ORDER BY revenue DESC;
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
