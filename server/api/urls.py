from django.urls import path

from . import views

urlpatterns = [
    path("", views.gaps_list, name="gaps_list"),
    path("<str:pk>/", views.getGap, name="gap"),
   
    
]
