import json
import traceback
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
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

    response = JsonResponse(data, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response


# -------------------------
# Tech Stack API (GET)
# -------------------------
def tech_stack_list(request):
    techs = TechStack.objects.all().values()
    response = JsonResponse(list(techs), safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    return response


# -------------------------
# Contact API (POST)
# -------------------------
@csrf_exempt
def contact_api(request):
    """
    Contact form API endpoint - SIMPLIFIED WITH CORS
    """
    
    # HANDLE OPTIONS FIRST - ABSOLUTE PRIORITY
    if request.method == "OPTIONS":
        response = HttpResponse("")
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRFToken"
        response["Access-Control-Max-Age"] = "86400"
        return response

    # Only POST allowed
    if request.method != "POST":
        response = JsonResponse({"error": "Only POST allowed"}, status=405)
        response["Access-Control-Allow-Origin"] = "*"
        return response

    # Process POST request
    try:
        data = json.loads(request.body)
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not name or not email or not message:
            response = JsonResponse({
                "error": "Missing required fields",
                "missing_fields": [k for k, v in {"name": name, "email": email, "message": message}.items() if not v]
            }, status=400)
            response["Access-Control-Allow-Origin"] = "*"
            return response

        # Save to database
        db_saved = False
        db_error = None
        try:
            ContactMessage.objects.create(name=name, email=email, message=message)
            db_saved = True
        except Exception as e:
            db_error = str(e)

        # Send email
        email_sent = False
        email_error = None
        try:
            from django.core.mail import EmailMessage
            mail = EmailMessage(
                subject=f"Portfolio Contact from {name}",
                body=f"FROM: {name}\nEMAIL: {email}\n\nMESSAGE:\n{message}",
                from_email="namanm608@gmail.com",
                to=["namanm608@gmail.com"],
                reply_to=[email],
            )
            mail.send(fail_silently=False)
            email_sent = True
        except Exception as e:
            email_error = str(e)

        # Return response
        if db_saved or email_sent:
            response = JsonResponse({
                "success": True,
                "message": "Message received",
                "details": {
                    "database_saved": db_saved,
                    "email_sent": email_sent
                }
            }, status=200)
        else:
            response = JsonResponse({
                "error": "Failed to process contact form",
                "details": {
                    "database_error": db_error,
                    "email_error": email_error
                }
            }, status=500)
        
        response["Access-Control-Allow-Origin"] = "*"
        return response

    except json.JSONDecodeError:
        response = JsonResponse({"error": "Invalid JSON"}, status=400)
        response["Access-Control-Allow-Origin"] = "*"
        return response
    except Exception as e:
        response = JsonResponse({
            "error": "Internal server error",
            "message": str(e)
        }, status=500)
        response["Access-Control-Allow-Origin"] = "*"
        return response
