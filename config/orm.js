const connection = require('./connection.js');

const orm = {
  selectAll: function(table, onResult) {
    const query = 'SELECT * FROM ??';
    connection.query(query, [table], function(err, result) {
      onResult(err, result);
    })
  },
  insertInto: function(table, columns, values, onResult) {
    const query = "INSERT INTO ?? (??) VALUES (?)";
    connection.query(query, [table, columns, values] , function(err, result) {
      // now we pass the result back in our callback
      console.log(err)
      onResult(err, result);
    })
  },
  updateOne: function(table, column, value, id, onResult) {
    const query = 'UPDATE ?? SET ?? = ? WHERE id = ?'
    connection.query(query, [table, column, value, id], function(err, result) {
      console.log(err)
      onResult(err, result);
    })
  },
  deleteOne: function(table, id, onResult) {
    const query = "DELETE FROM ?? WHERE id = ?"
    connection.query(query, [table, id], function(err, result) {
      onResult(err, result);
    })
  }
}

module.exports = orm;