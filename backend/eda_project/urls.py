"""
URL configuration for eda_project project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    """Root endpoint to verify API is running"""
    return JsonResponse({
        'status': 'success',
        'message': 'EDA Backend API is running',
        'endpoints': {
            'filters': '/api/filters/',
            'dashboard': '/api/dashboard/',
            'admin': '/admin/'
        }
    })


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
