from django.urls import path
from app import views
urlpatterns = [
    path('', views.Home, name="Home"),
    path('about/', views.About, name="about"),
    path('login/', views.Login, name="login"),
    path('register/', views.Register, name="register"),
]