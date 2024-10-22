from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.cache import cache

# Generate a random OTP
def generate_otp():
    return random.randint(100000, 999999)

# Send OTP to user's email
def send_otp_email(email, otp):
    print('otp :' , otp)
    send_mail(
        'Your OTP Code',
        f'Your OTP is {otp}',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

@csrf_exempt
@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        data = request.data
        email = data.get('email')

        # Generate and store OTP in cache
        otp = generate_otp()
        cache.set(email, otp, timeout=300)  # OTP expires in 5 minutes

        # Send OTP to email
        send_otp_email(email, otp)

        return JsonResponse({'message': 'OTP sent to your email'}, status=status.HTTP_200_OK)

# Verify OTP and create user if successful
@csrf_exempt
@api_view(['POST'])
def verify_otp(request):
    if request.method == 'POST':
        email = request.data.get('email')
        input_otp = request.data.get('otp')
        cached_otp = cache.get(email)
        print('input_otp' , input_otp , 'cached_otp' , cached_otp)
        
        if cached_otp and str(cached_otp) == input_otp:
            print('opt correct')
            serializer = UserSerializer(data=request.data)
            print(request.data)
            print('sdfsdf' ,serializer.is_valid())
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        
        
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except AuthenticationFailed as e:
            return Response({'error': str(e)}, status=400)

        return Response({
            'access': response.data['access'],
            'refresh': response.data['refresh'],
            'user': {
                'email': request.data['email'],
                'phone': request.data.get('phone'),
                'gender': request.data.get('gender'),
            }
        })