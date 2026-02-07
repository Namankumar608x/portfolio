from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Project, TechStack, ContactMessage
from .serializers import ProjectSerializer, TechStackSerializer
from django.tasks import task
from django.core.mail import send_mail

# Define the task for Django 6.0's native worker
@task
def send_contact_email_task(name, email, message):
    send_mail(
        subject=f"New Portfolio Message from {name}",
        message=f"From: {email}\n\n{message}",
        from_email=None,
        recipient_list=["namanm608@gmail.com"],
    )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_tech_stack(request):
    tech = TechStack.objects.all()
    serializer = TechStackSerializer(tech, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')
    
    # Save to DB first
    ContactMessage.objects.create(name=name, email=email, message=message)
    
    # Offload email to background task (Django 6.0 style)
    send_contact_email_task.enqueue(name, email, message)
    
    return Response({"message": "Sent successfully!"}, status=201)