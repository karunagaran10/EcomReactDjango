from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('empinfo/', views.Empinfo, name='empinfo'),
    path('register/', views.register_user, name='register'),
    path('registerdata/', views.Registeruserdatas, name='data'),
    path('register/<int:pk>/', views.register_detail, name='detail'),

]