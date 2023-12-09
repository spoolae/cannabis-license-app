const express = require("express");
const routes = require("./routes");

const app = express();
const port = 5000;

// createTables();

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
