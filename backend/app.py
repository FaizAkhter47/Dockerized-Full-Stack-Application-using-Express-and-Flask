from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def home():
    return "Flask Backend Running"


@app.route("/health")
def health():
    return {
        "status": "healthy",
        "service": "backend"
    }


@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name")
    email = request.form.get("email")

    print("Received data:", name, email)

    return f"""
    <h2>Data Received Successfully</h2>

    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    """


if __name__ == "__main__":
    print("Backend running on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)