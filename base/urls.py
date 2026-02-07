from django.urls import path
from . import views

urlpatterns = [
    path("projects/", views.get_projects, name="projects"),
    path("tech-stack/", views.get_tech_stack, name="tech_stack"),
    path("contact/", views.contact_view, name="contact"),
]