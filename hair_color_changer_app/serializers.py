import base64
from rest_framework import serializers
from hair_color_changer_app.models import User, Image
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
    profile_image = serializers.ImageField(required=False)
    profile_image_base64 = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('user_id', 'first_name', 'last_name', 'phone_number',
                  'created_at', 'updated_at', 'email', 'age',
                  'profile_image', 'username', 'password', 'profile_image', 'profile_image_base64')

    def get_profile_image_base64(self, obj):
        return obj.profile_image

    def create(self, validated_data):
        profile_image = validated_data.get('profile_image', None)

        if profile_image:
            validated_data['profile_image'] = image_to_base64(profile_image)

        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        error_messages={'blank': 'Please enter your username.'},
        required=True,
    )
    password = serializers.CharField(
        error_messages={'blank': 'Please enter your password.'},
        required=True,
        write_only=True
    )


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(write_only=True, required=False)
    profile_image_base64 = serializers.SerializerMethodField()

    ALLOWED_TYPES = ['jpeg', 'jpg', 'png']

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'phone_number',
                  'email', 'age', 'profile_image',
                  'username', 'profile_image_base64')

    def get_profile_image_base64(self, obj):
        return obj.profile_image

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.email = validated_data.get('email', instance.email)
        instance.age = validated_data.get('age', instance.age)
        instance.username = validated_data.get('username', instance.username)

        profile_image_request = validated_data.get('profile_image')
        if profile_image_request:
            instance.profile_image = image_to_base64(profile_image_request)
        else:
            instance.profile_image = instance.profile_image
        instance.save()

        return instance


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class UserImageSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['age', 'phone_number', 'first_name', 'last_name',
                  'email', 'profile_image', 'username', 'images']

    def get_images(self, obj):
        images = Image.objects.filter(user=obj)

        return ImageSerializer(images, many=True).data





