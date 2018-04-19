
// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

orm.selectAll("orders");

orm.insertInto("orders", "food_order", "devoured");

orm.deleteOne("orders", "food_order", "devoured", "id"); 

orm.updateOne("orders", "id");

// Export the database functions for the controller (catsController.js).
module.exports = burger;