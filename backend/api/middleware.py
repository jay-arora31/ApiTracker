# yourapp/middleware.py

from .models import APIHit
from django.utils.deprecation import MiddlewareMixin
import time

class APIHitTrackingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Record the start time
        request.start_time = time.time()

        request_type = request.method
        payload = request.body.decode('utf-8') if request.body else ''
        content_type = request.content_type
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        
        ip_address = ip
        user_agent = request.META.get('HTTP_USER_AGENT', 'unknown')


        os = request.META.get('HTTP_SEC_CH_UA_PLATFORM', 'unknown')  # Use existing method to get OS
        
        # If OS is unknown, use the User-Agent as OS
        if os == 'unknown':
            os = user_agent

        request_id = request.path
        
        # Initialize APIHit entry without response_time or status for now
        self.api_hit_entry = APIHit(
            request_type=request_type,
            payload=payload,
            content_type=content_type,
            ip_address=ip_address,
            user_agent=user_agent,
            os=os,
            request_id=request_id
        )

    def process_response(self, request, response):
        # Calculate the response time
        response_time = time.time() - request.start_time  
        self.api_hit_entry.response_time = response_time  
        self.api_hit_entry.status = response.status_code  

        # Save the API hit entry to the database
        self.api_hit_entry.save()

        return response
