from django.contrib import admin
from django.urls import path
from hair_color_changer_app.views import HairColorChanger, Login, Logout, Register, UpdateUser

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dye/', HairColorChanger.as_view()),
    path('api/login/', Login.as_view()),
    path('api/logout/', Logout.as_view()),
    path('api/register/', Register.as_view()),
    path('api/update_user/', UpdateUser.as_view()),
]
