from django.contrib import admin
from .models import Project, TechStack
from .models import ContactMessage
admin.site.register(Project)
admin.site.register(TechStack)
admin.site.register(ContactMessage)
