from django.http import HttpResponse

class SimpleCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle OPTIONS
        if request.method == "OPTIONS":
            response = HttpResponse("")
            self.add_cors(response)
            return response
        
        # Get response from view
        response = self.get_response(request)
        
        # Add CORS to all responses
        self.add_cors(response)
        return response
    
    def add_cors(self, response):
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRFToken"
        response["Access-Control-Max-Age"] = "86400"
