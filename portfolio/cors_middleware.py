"""
Custom CORS Middleware
Place this file in your project root or base app directory (e.g., myproject/middleware.py)
"""
from django.http import HttpResponse

class CorsMiddleware:
    """
    Simple CORS middleware that adds headers to all responses.
    This is a fallback if django-cors-headers doesn't work.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 1. Handle preflight OPTIONS requests
        # Browsers send this to check permissions before the real request
        if request.method == "OPTIONS":
            response = HttpResponse(status=200)
        else:
            response = self.get_response(request)
        
        # 2. Add CORS headers to all responses
        # IMPORTANT: No trailing slash at the end of the origin
        response["Access-Control-Allow-Origin"] = "http://localhost:5173"
        
        # 3. Allow standard HTTP methods
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        
        # 4. Allow specific headers (Authorization is crucial for JWT/Token auth)
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, Origin"
        
        # 5. Allow cookies/sessions to be sent
        response["Access-Control-Allow-Credentials"] = "true"
        
        # 6. Cache the preflight response for 24 hours
        response["Access-Control-Max-Age"] = "86400"
        
        return response