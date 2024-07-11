import base64
import cv2
import numpy as np
import mediapipe as mp
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from PIL import Image as PilImage
from io import BytesIO
from hair_color_changer_app.models import User, Image
from hair_color_changer_app.serializers import UserSerializer, LoginSerializer, UserUpdateSerializer


class HairColorChanger(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        image_file = request.FILES.get('image')
        hex_color = request.data.get('hex_color')
        rgb_color = request.data.get('rgb_color')

        if not image_file:
            return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Convert hex color to RGB if provided
        if hex_color:
            hex_color = hex_color.lstrip('#')
            target_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        elif rgb_color:
            target_color = tuple(map(int, rgb_color.split(',')))
        else:
            return Response({"error": "No color provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the options that will be used for ImageSegmenter
        base_options = python.BaseOptions(model_asset_path='hair_color_changer_app/models/hair_segmenter.tflite')
        options = vision.ImageSegmenterOptions(base_options=base_options, output_category_mask=True)

        # Create the image segmenter
        with vision.ImageSegmenter.create_from_options(options) as segmenter:
            # Read the image
            image = PilImage.open(image_file)
            image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image)

            # Retrieve the masks for the segmented image
            segmentation_result = segmenter.segment(mp_image)
            category_mask = segmentation_result.category_mask

            # Convert the BGR image to RGB
            image_data = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Create the target color image with the same intensity as the original image
            target_color_image = np.zeros_like(image_data)
            for i in range(3):
                target_color_image[:, :, i] = (target_color[i] / 255.0) * image_data[:, :, i]

            # Apply the color change effect while maintaining texture and gradient
            condition = np.stack((category_mask.numpy_view(),) * 3, axis=-1) > 0.2
            output_image = np.where(condition, target_color_image, image_data)

            # Convert to PIL image for response
            pil_img = PilImage.fromarray(output_image)
            buffer = BytesIO()
            pil_img.save(buffer, format="JPEG")
            buffer.seek(0)

            # Encode the image to base64
            image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            user = User.objects.get(username=request.user)
            Image.objects.create(user=user, image=image_base64)

            return JsonResponse({"result": "success", "image": image_base64}, status=status.HTTP_200_OK)


class Login(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            user = User.objects.get(username=username)

            if user is not None and user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({'error': 'Invalid token or user not logged in.'}, status=status.HTTP_400_BAD_REQUEST)


class Register(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response({
                'user': serializer.data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUser(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

