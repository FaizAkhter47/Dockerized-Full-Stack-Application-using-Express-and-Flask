const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));

const CSS = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Inter, Arial, sans-serif;
  min-height: 100vh;
  background: #f5f7fb;
  color: #172033;
}

.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.hero {
  width: 100%;
  max-width: 720px;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 8px 15px;
  margin-bottom: 20px;
  border-radius: 30px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 13px;
  font-weight: 700;
  animation: fadeDown .6s ease;
}

.hero h1 {
  font-size: clamp(38px, 6vw, 62px);
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 20px;
  color: #111827;
  animation: fadeUp .7s ease;
}

.hero h1 span {
  display: block;
  color: #635bff;
}

.hero-text {
  max-width: 560px;
  margin: 0 auto 35px;
  color: #6b7280;
  font-size: 17px;
  line-height: 1.7;
  animation: fadeUp .8s ease;
}

.form-card {
  max-width: 470px;
  margin: auto;
  padding: 32px;
  background: #ffffff;
  border: 1px solid #e8eaf0;
  border-radius: 20px;
  text-align: left;
  box-shadow: 0 20px 60px rgba(17, 24, 39, .08);
  animation: cardIn .8s ease;
}

.card-header {
  margin-bottom: 25px;
}

.card-header h2 {
  font-size: 21px;
  margin-bottom: 7px;
  color: #111827;
}

.card-header p {
  color: #8a91a3;
  font-size: 14px;
}

.input-group {
  margin-bottom: 19px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-size: 14px;
  font-weight: 700;
}

.input-group input {
  width: 100%;
  height: 52px;
  padding: 0 15px;
  border: 1px solid #dfe3ea;
  border-radius: 11px;
  outline: none;
  background: #fafbfc;
  color: #111827;
  font-size: 15px;
  transition: .25s ease;
}

.input-group input::placeholder {
  color: #a5abb8;
}

.input-group input:hover {
  border-color: #b9bdf5;
}

.input-group input:focus {
  background: #fff;
  border-color: #635bff;
  box-shadow: 0 0 0 4px rgba(99, 91, 255, .10);
}

button {
  width: 100%;
  height: 52px;
  margin-top: 5px;
  border: 0;
  border-radius: 11px;
  background: #635bff;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: .25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

button:hover {
  background: #5148e8;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 91, 255, .25);
}

button:active {
  transform: translateY(0);
}

.arrow {
  font-size: 20px;
  transition: .25s ease;
}

button:hover .arrow {
  transform: translateX(4px);
}

.secure {
  text-align: center;
  margin-top: 18px;
  color: #9aa1af;
  font-size: 12px;
}

/* SUCCESS PAGE */

.success-card {
  width: 100%;
  max-width: 500px;
  padding: 45px 35px;
  background: white;
  border: 1px solid #e8eaf0;
  border-radius: 22px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(17, 24, 39, .08);
  animation: cardIn .7s ease;
}

.success-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ecfdf3;
  color: #16a34a;
  font-size: 34px;
  font-weight: 800;
}

.success-card h1 {
  margin-bottom: 12px;
  color: #111827;
  font-size: 30px;
}

.success-card p {
  color: #6b7280;
  line-height: 1.6;
}

.submitted-data {
  margin: 25px 0;
  padding: 15px;
  background: #f8f9fc;
  border-radius: 10px;
  color: #374151;
}

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 10px;
  background: #635bff;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  transition: .25s ease;
}

.back-button:hover {
  background: #5148e8;
  transform: translateY(-2px);
}

/* ERROR */

.error-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff1f2;
  color: #e11d48;
  font-size: 30px;
  font-weight: 800;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(25px) scale(.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .page {
    padding: 25px 16px;
  }

  .hero h1 {
    font-size: 40px;
    letter-spacing: -1.5px;
  }

  .hero-text {
    font-size: 15px;
  }

  .form-card {
    padding: 25px 20px;
  }

  .success-card {
    padding: 35px 22px;
  }
}
`;

function page(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Portal</title>
  <style>${CSS}</style>
</head>
<body>
  ${content}
</body>
</html>
`;
}

// HOME
app.get("/", (req, res) => {
  res.send(
    page(`
      <main class="page">
        <section class="hero">

          <div class="badge">✦ Student Portal</div>

          <h1>
            Welcome to your
            <span>Student Portal</span>
          </h1>

          <p class="hero-text">
            Submit your details securely and connect with our
            student management system.
          </p>

          <div class="form-card">

            <div class="card-header">
              <h2>Student Information</h2>
              <p>Please enter your details below</p>
            </div>

            <form action="/submit" method="POST">

              <div class="input-group">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                >
              </div>

              <div class="input-group">
                <label for="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                >
              </div>

              <button type="submit">
                <span>Submit Details</span>
                <span class="arrow">→</span>
              </button>

            </form>

            <div class="secure">
              🔒 Your information is securely processed
            </div>

          </div>

        </section>
      </main>
    `)
  );
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "frontend"
  });
});

// SUBMIT
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

    res.send(
      page(`
        <main class="page">

          <section class="success-card">

            <div class="success-icon">✓</div>

            <h1>Submission Successful</h1>

            <p>
              Your details have been submitted successfully.
            </p>

            <div class="submitted-data">
              ${response.data}
            </div>

            <a href="/" class="back-button">
              ← Back to Home
            </a>

          </section>

        </main>
      `)
    );

  } catch (error) {
    console.error("Backend error:", error.message);

    res.status(503).send(
      page(`
        <main class="page">

          <section class="success-card">

            <div class="error-icon">!</div>

            <h1>Something went wrong</h1>

            <p>
              We couldn't connect to the backend service.
              Please try again.
            </p>

            <br>

            <a href="/" class="back-button">
              ← Try Again
            </a>

          </section>

        </main>
      `)
    );
  }
});

app.listen(3000, () => {
  console.log("Frontend running on port 3000");
});
