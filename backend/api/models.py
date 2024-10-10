from django.db import models


class APIHit(models.Model):
    request_id = models.CharField(max_length=200)
    request_type = models.CharField(max_length=10)
    request_time = models.DateTimeField(auto_now_add=True)
    payload = models.TextField(blank=True, null=True)
    content_type = models.CharField(max_length=100, blank=True, null=True)
    ip_address = models.GenericIPAddressField()
    os = models.CharField(max_length=50)
    user_agent = models.CharField(max_length=200)
    response_time = models.FloatField(null=True)  # Store response time
    status = models.IntegerField(null=True)  # Add status field to store HTTP status codes

    def __str__(self):
        return f'{self.id} - {self.request_type}'


class Todo(models.Model):
    task_name = models.CharField(max_length=200)
    def __str__(self):
        return f'{self.id}'
    

    