const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HOME PAGE
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

      <nav class="navbar">
        <div class="logo">Student<span>Portal</span></div>

        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/submit">Register</a>
        </div>
      </nav>

      <main class="hero">
        <div class="hero-content">
          <div class="badge">🎓 Student Management System</div>

          <h1>
            Welcome to Your
            <span>Student Portal</span>
          </h1>

          <p>
            A simple and secure platform to submit and manage
            student information.
          </p>

          <div class="hero-buttons">
            <a href="/submit" class="btn primary">Register Student →</a>
          </div>
        </div>

        <div class="hero-card">
          <div class="icon">🎓</div>
          <h3>Student Registration</h3>
          <p>Submit your basic details quickly and securely.</p>

          <div class="feature">
            <span>✓</span> Simple registration
          </div>

          <div class="feature">
            <span>✓</span> Fast processing
          </div>

          <div class="feature">
            <span>✓</span> Secure submission
          </div>
        </div>
      </main>

      <section class="info-section">
        <h2>Everything you need</h2>

        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">📝</div>
            <h3>Easy Registration</h3>
            <p>Enter your name and email through our simple form.</p>
          </div>

          <div class="info-card">
            <div class="info-icon">⚡</div>
            <h3>Fast Response</h3>
            <p>Your information is sent directly to the backend.</p>
          </div>

          <div class="info-card">
            <div class="info-icon">🔒</div>
            <h3>Reliable System</h3>
            <p>Built with a separate frontend and backend architecture.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Student Portal. Built with Express & Flask.</p>
      </footer>

    </body>
    </html>
  `);
});


// SUBMIT PAGE
app.get("/submit", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Register Student</title>
      <link rel="stylesheet" href="/app.css">
    </head>

    <body>

      <nav class="navbar">
        <div class="logo">Student<span>Portal</span></div>

        <div class="nav-links">
          <a href="/">Home</a>
        </div>
      </nav>

      <main class="form-page">

        <div class="form-card">

          <div class="form-icon">🎓</div>

          <h1>Student Registration</h1>

          <p class="subtitle">
            Enter your details to register as a student.
          </p>

          <form action="/submit" method="POST">

            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              >
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                required
              >
            </div>

            <button type="submit" class="submit-btn">
              Submit Registration
            </button>

          </form>

          <p class="back-link">
            <a href="/">← Back to Home</a>
          </p>

        </div>

      </main>

    </body>
    </html>
  `);
});


// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "frontend"
  });
});


// SEND DATA TO FLASK BACKEND
app.post("/submit", async (req, res) => {
  try {
    console.log("Sending to backend:", req.body);

    const response = await axios.post(
      "http://13.233.105.174:5000/submit",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful</title>
        <link rel="stylesheet" href="/app.css">
      </head>

      <body>

        <nav class="navbar">
          <div class="logo">Student<span>Portal</span></div>
          <div class="nav-links">
            <a href="/">Home</a>
          </div>
        </nav>

        <main class="success-page">

          <div class="success-card">

            <div class="success-icon">✓</div>

            <h1>Registration Successful!</h1>

            <p>
              Student information has been successfully submitted.
            </p>

            <a href="/submit" class="btn primary">
              Register Another Student
            </a>

            <a href="/" class="success-home">
              Back to Home
            </a>

          </div>

        </main>

      </body>
      </html>
    `);

  } catch (error) {
    console.error("Backend error:", error.message);

    res.status(503).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Submission Failed</title>
        <link rel="stylesheet" href="/app.css">
      </head>

      <body>

        <main class="success-page">

          <div class="success-card error-card">

            <div class="error-icon">!</div>

            <h1>Submission Failed</h1>

            <p>
              Backend is currently unavailable. Please try again.
            </p>

            <a href="/submit" class="btn primary">
              Try Again
            </a>

          </div>

        </main>

      </body>
      </html>
    `);
  }
});


app.listen(3000, () => {
  console.log("Frontend running on http://localhost:3000");
});
