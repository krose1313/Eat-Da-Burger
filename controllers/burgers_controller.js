var express = require("express");
var bodyParser = require("body-parser");
const burger = require('../models/burger.js');

var app = express();
var port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//creating a path to render the index.html page which is using handlebars
app.get("/", function(req, res) {
	orm.selectAll('orders', function(err, data) {
		if (err) { return res.status(500).end();}
		res.render("index", { orders: data });
	});
});

//creating a new burger order and inserting it in the db
app.post("/orders", function(req, res) {
	orm.insertInto('orders', 'food_order', req.body.food_order, function(err, data) {
		if (err) { return res.status(500).end();}
		res.json({ id: data.insertID });
	});
});

//requesting all burger orders from the db
app.get("/orders", function(req, res) {
	orm.selectAll('orders', function(err, data) {
		if (err) { return res.status(500).end();}
		res.json(data);
	});
});


//updating an existing burger order
app.put("/orders/:id", function(req, res) {
  orm.updateOne('orders', 'food_order', req.body.food_order ,req.params.id, function(err, data) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (data.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});

//deleting a burger order
app.delete("/orders/:id", function(req, res) {
  orm.deleteOne('orders', req.params.id, function(err, data) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    }
    else if (data.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  })
});

app.listen(port, function() {
  console.log("listening on port", port);
});