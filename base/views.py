import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail


from django.core.mail import EmailMessage

from .models import Project, TechStack, ContactMessage


# -------------------------
# Projects API (GET)
# -------------------------
def projects_list(request):
    projects = Project.objects.all()

    data = []
    for project in projects:
        data.append({
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "tech_stack": project.tech_stack,
            "github_link": project.github_link,
            "live_link": project.live_link,
        })

    return JsonResponse(data, safe=False)


# -------------------------
# Tech Stack API (GET)
# -------------------------
def tech_stack_list(request):
    techs = TechStack.objects.all().values()
    return JsonResponse(list(techs), safe=False)


# -------------------------
# Contact API (POST)
# -------------------------




@csrf_exempt
def contact_api(request):
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = JsonResponse({"status": "ok"})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    try:
        data = json.loads(request.body)
        
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return JsonResponse({"error": "Missing fields"}, status=400)

        # Save to database
        ContactMessage.objects.create(
            name=name,
            email=email,
            message=message
        )

        # Send email notification
        mail = EmailMessage(
            subject=f"Portfolio Contact from {name}",
            body=f"""
New contact form submission:

Name: {name}
Email: {email}

Message:
{message}
""",
            from_email="namanm608@gmail.com",
            to=["namanm608@gmail.com"],
            reply_to=[email],
        )

        mail.send()

        return JsonResponse({"success": "Message sent"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
