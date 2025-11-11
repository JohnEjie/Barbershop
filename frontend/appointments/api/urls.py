from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('appointments', views.AppointmentViewSet, basename='appointment')
router.register('barbers', views.BarberViewSet, basename='barber')

urlpatterns = [
    path('auth/signup/', views.signup),
    path('auth/login/', views.login),
    path('auth/me/', views.current_user),
    path('', include(router.urls)),
]