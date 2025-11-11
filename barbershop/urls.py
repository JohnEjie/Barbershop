from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# simple homepage route for Render
def home(request):
    return HttpResponse("<h1>Welcome to Barbershop API</h1><p>Deployment successful!</p>")

urlpatterns = [
    path('', home),  # 👈 this ensures '/' returns something
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/barbers/', include('barbers.urls')),
    path('api/', include('appointments.api.urls')),
]
