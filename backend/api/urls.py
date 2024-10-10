from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('health/', health, name='health'),  # Ensure this line is present
    path('todos/', get_todos, name='get_todos'),
    path('todos/<int:todo_id>/', get_todo, name='get_todo'),
    path('todos-create/', create_todo, name='create_todo'),
    path('todos-update/<int:todo_id>/', update_todo, name='update_todo'),
    path('todos-delete/<int:todo_id>/', delete_todo, name='delete_todo'),
    path('api_data/', api_data, name='api_data'),  # New endpoint

]
