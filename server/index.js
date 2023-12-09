const express = require("express");
const { createTables } = require("./db/db.js");
const routes = require("./routes");

const app = express();
const port = 5000;

createTables();

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
