from rest_framework.test import APITestCase
from hair_color_changer_app.models import User, Image


class TestActivityAndSupplierModels(APITestCase):
    def setUp(self):
        """ Setup test cases database and client"""
        self.user = User.objects.create(first_name='John', last_name='Doe', phone_number='1234567890', age=30,
                                        profile_image='path/to/image')

    def tearDown(self):
        """ Teardown test cases database and client"""
        self.user.delete()

    def test_user_exists(self):
        # Check if the user exists in the database
        user_exists = User.objects.filter(first_name='John', last_name='Doe').exists()
        self.assertTrue(user_exists)

    def test_user_not_exists(self):
        # Check if the user exists in the database
        user_exists = User.objects.filter(first_name='not john', last_name='Doe').exists()
        self.assertFalse(user_exists)


