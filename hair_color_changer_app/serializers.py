import base64
from rest_framework import serializers
from hair_color_changer_app.models import User
from PIL import Image as PilImage
from io import BytesIO


def image_to_base64(image_file):
    try:
        image = PilImage.open(image_file)
        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        buffer.seek(0)

        image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        return image_base64
    except Exception as e:
        raise serializers.ValidationError("Error converting image to Base64") from e


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('user_id', 'first_name', 'last_name', 'phone_number',
                  'created_at', 'updated_at', 'email', 'age',
                  'profile_image', 'username', 'password', 'profile_image')

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)

        if profile_image:
            try:
                validated_data['profile_image'] = image_to_base64(profile_image)
            except Exception as e:
                raise serializers.ValidationError("Error converting image to Base64") from e

        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone_number', 'email', 'age', 'profile_image', 'username')




