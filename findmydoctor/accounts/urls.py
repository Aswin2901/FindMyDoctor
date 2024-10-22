from django.urls import path
from .views import register_user ,verify_otp , CustomTokenObtainPairView


urlpatterns = [
    path('register/', register_user, name='register_user'),  
    path('verify-otp/', verify_otp, name='verify_otp'), 
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
