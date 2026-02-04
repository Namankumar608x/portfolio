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
    """
    Contact form API endpoint
    Handles POST requests to save contact messages and send emails
    """
    
    print("=" * 60)
    print(f"🔵 CONTACT API CALLED - Method: {request.method}")
    print(f"🔵 Origin: {request.META.get('HTTP_ORIGIN', 'No origin')}")
    print(f"🔵 Content-Type: {request.META.get('CONTENT_TYPE', 'No content type')}")
    print("=" * 60)
    
    # Helper function to add CORS headers to ALL responses
    def add_cors_headers(response):
        """Add CORS headers to allow cross-origin requests"""
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Accept, Origin"
        response["Access-Control-Max-Age"] = "86400"  # 24 hours
        print("✅ CORS headers added to response")
        return response

    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        print("🔵 OPTIONS preflight request detected")
        response = JsonResponse({"status": "ok"})
        response = add_cors_headers(response)
        print("✅ OPTIONS response sent with CORS headers")
        return response

    # Only allow POST for actual contact submission
    if request.method != "POST":
        print(f"❌ Invalid method: {request.method}")
        response = JsonResponse({"error": "Only POST method allowed"}, status=405)
        return add_cors_headers(response)

    # Process POST request
    try:
        print("📥 Parsing request body...")
        
        # Parse JSON body
        try:
            data = json.loads(request.body)
            print(f"✅ JSON parsed successfully")
            print(f"📋 Data keys: {list(data.keys())}")
        except json.JSONDecodeError as e:
            print(f"❌ JSON DECODE ERROR: {e}")
            response = JsonResponse({"error": "Invalid JSON format"}, status=400)
            return add_cors_headers(response)

        # Extract fields
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        print(f"📝 Name: {name}")
        print(f"📧 Email: {email}")
        print(f"💬 Message: {message[:50]}..." if len(message) > 50 else f"💬 Message: {message}")

        # Validate required fields
        if not name or not email or not message:
            print("❌ Missing required fields")
            missing = []
            if not name: missing.append("name")
            if not email: missing.append("email")
            if not message: missing.append("message")
            print(f"❌ Missing fields: {', '.join(missing)}")
            
            response = JsonResponse({
                "error": "Missing required fields",
                "missing_fields": missing
            }, status=400)
            return add_cors_headers(response)

        print("✅ All fields validated")

        # -------------------------
        # Step 1: Save to Database
        # -------------------------
        print("\n💾 Attempting to save to database...")
        db_saved = False
        db_error_msg = None
        
        try:
            contact_msg = ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            db_saved = True
            print(f"✅ DB SAVED - ID: {contact_msg.id}, Name: {name}, Email: {email}")
        except Exception as db_error:
            db_error_msg = str(db_error)
            print(f"❌ DB ERROR: {db_error}")
            print(f"❌ Error type: {type(db_error).__name__}")
            traceback.print_exc()
            # Continue to try email even if DB fails

        # -------------------------
        # Step 2: Send Email
        # -------------------------
        print("\n📧 Attempting to send email...")
        email_sent = False
        email_error_msg = None
        
        try:
            from django.core.mail import EmailMessage
            from django.conf import settings
            
            print(f"📧 EMAIL_BACKEND: {settings.EMAIL_BACKEND}")
            print(f"📧 EMAIL_HOST_USER: {settings.EMAIL_HOST_USER if hasattr(settings, 'EMAIL_HOST_USER') else 'Not set'}")
            
            mail = EmailMessage(
                subject=f"Portfolio Contact from {name}",
                body=f"""
New contact form submission from your portfolio website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FROM: {name}
EMAIL: {email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent via Portfolio Contact Form
""",
                from_email="namanm608@gmail.com",
                to=["namanm608@gmail.com"],
                reply_to=[email],
            )
            
            print("📧 EmailMessage object created, sending...")
            mail.send(fail_silently=False)
            email_sent = True
            print("✅ EMAIL SENT successfully to namanm608@gmail.com")
            
        except Exception as email_error:
            email_error_msg = str(email_error)
            print(f"❌ EMAIL ERROR: {email_error}")
            print(f"❌ Error type: {type(email_error).__name__}")
            traceback.print_exc()
            # Don't crash - message might be in DB

        # -------------------------
        # Step 3: Return Response
        # -------------------------
        print("\n📤 Preparing response...")
        
        # Determine overall success
        if db_saved or email_sent:
            print("✅ At least one operation succeeded")
            response_data = {
                "success": True,
                "message": "Message received",
                "details": {
                    "database_saved": db_saved,
                    "email_sent": email_sent
                }
            }
            
            if db_error_msg:
                response_data["warnings"] = {"database": db_error_msg}
            if email_error_msg:
                response_data["warnings"] = response_data.get("warnings", {})
                response_data["warnings"]["email"] = email_error_msg
            
            response = JsonResponse(response_data, status=200)
            print("✅ 200 OK response created")
            
        else:
            print("❌ Both DB and email failed")
            response = JsonResponse({
                "error": "Failed to process contact form",
                "details": {
                    "database_error": db_error_msg,
                    "email_error": email_error_msg
                }
            }, status=500)
            print("❌ 500 Error response created")

        response = add_cors_headers(response)
        print("=" * 60)
        print("🏁 CONTACT API COMPLETE")
        print("=" * 60)
        return response

    except Exception as e:
        print("\n" + "=" * 60)
        print(f"❌❌❌ UNEXPECTED ERROR ❌❌❌")
        print(f"Error: {e}")
        print(f"Type: {type(e).__name__}")
        print("Traceback:")
        traceback.print_exc()
        print("=" * 60)
        
        response = JsonResponse({
            "error": "Internal server error",
            "message": str(e),
            "type": type(e).__name__
        }, status=500)
        return add_cors_headers(response)
