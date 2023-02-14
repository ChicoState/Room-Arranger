from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

def home(request):
    return HttpResponse('Room arranger home page test9')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
]
