from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from hair_color_changer_app.models import User


class TestUserLogin(APITestCase):

    def setUp(self):
        """ Setup test cases database and client"""
        self.client = APIClient()
        self.user = User.objects.create_user(first_name='test_first', last_name='test_last', phone_number='1234567890',
                                             age=30,
                                             profile_image='hair_color_changer_app/static/default-user-image.png',
                                             username='test_username', email='test@test.com', password='test_password')

    def tearDown(self):
        """ Teardown test cases database and client"""
        self.client = None
        self.user.delete()

    def test_user_logged(self):
        response = self.client.post('/api/login/', {
            'username': 'test_username', 'password': 'test_password'
        })

        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_user_wrong_credential_username(self):
        response = self.client.post('/api/login/', {
            'username': 'test_username_wrong', 'password': 'test_password'
        })

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_wrong_credential_password(self):

        response = self.client.post('/api/login/', {
            'username': 'test_username', 'password': 'test_password_wrong'
        })

        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_missing_username(self):
        response = self.client.post('/api/login/', {
            'password': 'test_password'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_missing_password(self):
        response = self.client.post('/api/login/', {
            'username': 'test_username'
        })

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
