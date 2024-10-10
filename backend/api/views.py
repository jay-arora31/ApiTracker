from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.db.models import Count, Avg

from .models import APIHit, Todo
from .serializers import APIHitSerializer, TodoSerializer


# Create a new Todo
@api_view(['POST'])
def create_todo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get a list of all Todos
@api_view(['GET'])
def get_todos(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get a single Todo by ID
@api_view(['GET'])
def get_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TodoSerializer(todo)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Update a Todo by ID
@api_view(['PUT', 'PATCH'])
def update_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = TodoSerializer(todo, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete a Todo by ID
@api_view(['DELETE'])
def delete_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
    except Todo.DoesNotExist:
        return Response({'error': 'Todo not found.'}, status=status.HTTP_404_NOT_FOUND)

    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


def health(request):
    return JsonResponse({'status': 'healthy'})


@api_view(['GET'])
def api_data(request):
    # Fetch request type counts from the database
    request_type_data = (
        APIHit.objects.values('request_type')
        .annotate(value=Count('request_type'))
        .order_by('request_type')
    )

    total_request_count = APIHit.objects.count()

    # Convert the queryset to the desired format
    request_type_data = [
        {'name': item['request_type'], 'value': item['value']}
        for item in request_type_data
    ]

    # Fetch browser counts from the database (using user_agent as a proxy for browser)
    browser_data = (
        APIHit.objects.values('user_agent')
        .annotate(value=Count('user_agent'))
        .order_by('user_agent')
    )

    # Convert the queryset to the desired format
    browser_data = [
        {'name': item['user_agent'], 'value': item['value']}
        for item in browser_data
    ]

    failed_request_count = APIHit.objects.filter(status=400).count()

    # Fetch the latest requests from the database
    requests_data = APIHit.objects.values(
        'id', 'request_id', 'request_type', 'status',
        'request_time', 'payload', 'content_type',
        'ip_address', 'os', 'user_agent', 'response_time'
    ).order_by('-request_time')

    # Convert to list for JSON serialization
    requests_data = list(requests_data)

    # Calculate average response time
    avg_response_time = APIHit.objects.aggregate(Avg('response_time'))['response_time__avg']

    return Response({
        'requestTypeData': request_type_data,
        'browserData': browser_data,
        'requestsData': requests_data,
        'avgResponseTime': avg_response_time,
        'failedRequestCount': failed_request_count,
        'totalRequests': total_request_count,
    })
