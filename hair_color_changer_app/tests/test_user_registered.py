from rest_framework import status
from rest_framework.test import APITestCase, APIClient


class TestUserRegistered(APITestCase):
    def setUp(self):
        """ Setup test cases database and client"""
        self.client = APIClient()

    def tearDown(self):
        """ Teardown test cases database and client"""
        self.client = None

    def test_user_registered(self):

        response = self.client.post('/api/register/', {
            'username': 'test_username', 'password': 'test_password', 'email': 'test@test.com',
            'first_name': 'test_first_name', 'last_name': 'test_last_name'
        })

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_user_missing_data_username(self):
        response = self.client.post('/api/register/', {
            'password': 'test_password', 'email': 'test@test.com',
            'first_name': 'test_first_name', 'last_name': 'test_last_name'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_missing_data_password(self):
        response = self.client.post('/api/register/', {
            'username': 'test_username', 'email': 'test@test.com',
            'first_name': 'test_first_name', 'last_name': 'test_last_name'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_missing_data_email(self):
        response = self.client.post('/api/register/', {
            'username': 'test_username', 'password': 'test_password',
            'first_name': 'test_first_name', 'last_name': 'test_last_name'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_missing_data_first_name(self):
        response = self.client.post('/api/register/', {
            'username': 'test_username', 'password': 'test_password',
            'email': 'test@test.com', 'last_name': 'test_last_name'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_missing_data_last_name(self):
        response = self.client.post('/api/register/', {
            'username': 'test_username', 'password': 'test_password',
            'email': 'test@test.com', 'first_name': 'test_first_name',
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

