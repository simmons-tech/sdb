from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponseRedirect
from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from .serializers import TodoSerializer, UserSerializer, UserSerializerWithToken
from .models import Todo, User
from .enums import ResidentType
from django.db.models import Q
import csv
import io

class TodoView(viewsets.ModelViewSet):
  serializer_class = TodoSerializer

  def get_queryset(self):
        return self.request.user.todos.all()

  def perform_create(self, serializer):
      serializer.save(owner=self.request.user)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(viewsets.ViewSet):
    """
    View and create User objects
    """

    def list(self, request):
      query = request.query_params.get("query", None)
      users = User.objects.filter(hidden = False)
      for term in query.split():
        print(term)
        users = users.filter(Q(username__istartswith = term) | Q(first_name__istartswith = term) | Q(last_name__istartswith = term))
        
      serializer = UserSerializer(users[:5], many = True)
      return Response(serializer.data)

    def create(self, request):
        request.data['email'] = request.data['username'] + "@mit.edu"
        request.data['resident_type'] = ResidentType[request.data['resident_type']]
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def csv_upload(self, request, format=None):
      user_csv = request.FILES['user_csv']
      user_csv.seek(0)
      reader = csv.DictReader(io.StringIO(user_csv.read().decode('utf-8')))
      for row in reader:
        user, created = User.objects.update_or_create(
          username = row['username'],
          defaults = {
            'email': row['username'] + "@mit.edu",
            'first_name': row['firstname'],
            'last_name': row['lastname'],
            'year': row['year'] if row['year'] else None,
            'room': row['room'],
            'resident_type': ResidentType[row['type']],
            'immortal': False,
            'hidden': False,
          }
        )
      return Response()