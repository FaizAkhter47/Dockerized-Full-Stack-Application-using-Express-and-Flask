import unittest
from app import app


class HealthCheckTest(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_health_endpoint(self):
        response = self.client.get("/health")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()

        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["service"], "backend")


if __name__ == "__main__":
    unittest.main()