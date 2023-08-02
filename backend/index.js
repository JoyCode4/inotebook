const connectToMongo = require("./db");
const express = require('express');
const cors = require("cors");

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Avaiable Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth",require("./routes/auth.js"));
app.use("/api/notes",require("./routes/notes.js"));
app.use("/api/user",require("./routes/user.js"));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
})