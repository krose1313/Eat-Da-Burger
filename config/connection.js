const mysql  = require('mysql');

const connection = mysql.createConnection({
  host: "fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "uzk8rmdadugbdjtp",
  password: "olqz8jiqdlba3ghg",
  database: "hjp1s80ha0ae6qyi"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;