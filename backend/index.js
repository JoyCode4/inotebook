const connectToMongo = require("./db");
const express = require('express');

connectToMongo();
const app = express()
const port = 5000

app.use(express.json());

// Avaiable Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth",require("./routes/auth.js"));
app.use("/api/notes",require("./routes/notes.js"));
app.use("/api/user",require("./routes/user.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})