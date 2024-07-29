from rest_framework import status
from rest_framework.authtoken.models import Token
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

        self.token = Token.objects.create(user=self.user)

    def tearDown(self):
        """ Teardown test cases database and client"""
        self.client = None
        self.user.delete()
        self.token.delete()

    def test_user_logged_out_with_correct_token(self):
        response = self.client.post('/api/logout/', headers={'Authorization': f'Token {self.token}'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': 'Successfully logged out.'})

    def test_user_logged_out_no_token(self):
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_logged_out_with_wrong_token(self):
        response = self.client.post('/api/logout/', headers={'Authorization': 'Token wrong_token'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
