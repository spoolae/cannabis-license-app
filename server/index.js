const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = 5000;

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
