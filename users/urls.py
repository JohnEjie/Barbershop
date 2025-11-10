from django.urls import path
from .views import UserLoginView, UserRegistrationView, CurrentUserView

urlpatterns = [
    path('auth/signup/', UserRegistrationView.as_view(), name='signup'),
    path('auth/login/', UserLoginView.as_view(), name='login'),
    path('auth/me/', CurrentUserView.as_view(), name='current_user'),
]
