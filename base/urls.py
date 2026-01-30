from django.urls import path
from . import views

urlpatterns = [
    path("projects/", views.projects_list),
    path("tech-stack/", views.tech_stack_list),
    path("contact/", views.contact_api),
]
