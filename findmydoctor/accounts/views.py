from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)  # Allow any user to access this view

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return Response({
            'access': response.data['access'],
            'refresh': response.data['refresh'],
            'user': {
                'email': request.data['email'],
                'phone': request.data.get('phone'),  # if phone is part of the user model
                'gender': request.data.get('gender'),  # if gender is part of the user model
            }
        })
