from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# simple homepage view
def home(request):
    return HttpResponse("<h1>Welcome to the Barbershop API</h1><p>Server is running!</p>")

urlpatterns = [
    path('', home),  # 👈 Add this line for homepage
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/barbers/', include('barbers.urls')),
    path('api/', include('appointments.api.urls')),
]
