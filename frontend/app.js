const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <h2>Student Form</h2>

    <form action="/submit" method="POST">

      <label>Name:</label><br>
      <input type="text" name="name"><br><br>

      <label>Email:</label><br>
      <input type="email" name="email"><br><br>

      <button type="submit">Submit</button>

    </form>
  `);
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post("http://backend:5000/submit", req.body);

    res.send(response.data);

  } catch (error) {
    res.send("Backend not reachable");
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});
