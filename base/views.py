import json
import traceback
from django.http import JsonResponse
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

        # -------------------------
        # Step 1: Save to DB
        # -------------------------
        try:
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            print(f"✅ DB SAVED: {name} - {email}")
        except Exception as db_error:
            print(f"❌ DB ERROR: {db_error}")
            traceback.print_exc()
            # Don't return here, still try to send email

        # -------------------------
        # Step 2: Send Email
        # -------------------------
        try:
            from django.core.mail import EmailMessage

            mail = EmailMessage(
                subject=f"Portfolio Contact from {name}",
                body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
                from_email="namanm608@gmail.com",
                to=["namanm608@gmail.com"],
                reply_to=[email],
            )
            mail.send()
            print(f"✅ EMAIL SENT to namanm608@gmail.com")
        except Exception as email_error:
            print(f"❌ EMAIL ERROR: {email_error}")
            traceback.print_exc()
            # Don't crash, message is already saved in DB

        # -------------------------
        # Step 3: Return success
        # -------------------------
        return JsonResponse({"success": "Message sent"}, status=200)

    except json.JSONDecodeError as e:
        print(f"❌ JSON DECODE ERROR: {e}")
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    except Exception as e:
        print(f"❌ UNEXPECTED ERROR: {e}")
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)
