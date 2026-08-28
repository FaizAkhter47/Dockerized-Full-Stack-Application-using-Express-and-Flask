const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Student Portal</title>

      <link rel="stylesheet" href="/app.css">
    </head>

    <body>

      <div class="container">

        <div class="card">

          <h1>Student Form</h1>

          <p class="subtitle">
            Enter your details to continue
          </p>

          <form action="/submit" method="POST">

            <div class="form-group">
              <label for="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              >
            </div>

            <button type="submit">
              Submit
            </button>

          </form>

        </div>

      </div>

    </body>

    </html>
  `);
});


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "frontend"
  });
});


app.post("/submit", async (req, res) => {
  try {
    console.log("Sending to backend:", req.body);

    const response = await axios.post(
      "http://127.0.0.1:5000/submit",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    res.send(response.data);

  } catch (error) {
    console.error("Backend error:", error.message);

    if (error.response) {
      console.error("Backend response:", error.response.status);
      console.error(error.response.data);
    }

    res.status(503).send("Backend not reachable");
  }
});


app.listen(3000, () => {
  console.log("Frontend running on http://localhost:3000");
});