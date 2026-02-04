"""
Custom CORS Middleware
Place this file in your project root or base app directory
"""

class CorsMiddleware:
    """
    Simple CORS middleware that adds headers to all responses.
    This is a fallback if django-cors-headers doesn't work.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle preflight OPTIONS requests
        if request.method == "OPTIONS":
            from django.http import HttpResponse
            response = HttpResponse()
            response.status_code = 200
        else:
            response = self.get_response(request)
        
        # Add CORS headers to all responses
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, Origin"
        response["Access-Control-Max-Age"] = "86400"
        
        return response
