from django.urls import path
from . import views

urlpatterns = [
    # Example endpoint (you can modify later)
    path('', views.get_barbers, name='get_barbers'),
]
