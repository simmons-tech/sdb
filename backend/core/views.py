from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from .models import *
from .enums import ResidentType
from django.db.models import Q
from django.db.models.aggregates import Count
import random
import csv
import io

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def highlighted_user(request):
  """
  Return a 15 seconds of fame User
  """
  qs = User.objects.all() \
    .exclude(quote__isnull=True) \
    .exclude(quote__exact='')
    
  qs = qs | User.objects.all() \
    .exclude(favorite_category__isnull=True) \
    .exclude(favorite_category__exact='') \
    .exclude(favorite_item__isnull=True) \
    .exclude(favorite_item__exact='')
  count = qs.aggregate(count=Count('id'))['count']
  index = random.randint(0, count - 1)
  user = qs.all()[index]
  serializer = DetailedUserSerializer(user)
  return Response(serializer.data)

@api_view(['POST'])
def impersonate(request):
  # TODO: Check authorization
  user = User.objects.get(username=request.data['kerb'])
  refresh = RefreshToken.for_user(user)
  refresh['user'] = UserSerializer(user).data
  return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })

class UserList(viewsets.ModelViewSet):
    queryset = User.objects.all()

    @action(detail=True, methods=['get'])
    def get_profile(self, request, pk=None):
      """
      Returns information about the signed in user's profile.
      Returns an error if the requested PK does not match the
      user signed in.
      """
      user = self.get_object()
      if user.pk != self.request.user.pk:
        return Response(None, status=status.HTTP_401_UNAUTHORIZED)
      return Response(DetailedUserSerializer(user).data)

    @action(detail=True, methods=['post'])
    def update_profile(self, request, pk=None):
      """
      Updates the user's profile with the information
      provided. This should come from the "My Profile" page.
      Returns an error if the requested PK does not match
      the user signed in.
      """
      user = self.get_object()
      if user.pk != self.request.user.pk:
        return Response(None, status=status.HTTP_401_UNAUTHORIZED)
      data = {
        "homepage": request.data['homepage'],
        "cell_phone": request.data['cell_phone'],
        "home_city": request.data['home_city'],
        "state": request.data['state'],
        "country": request.data['country'],
        "quote": request.data['quote'],
        "favorite_category": request.data['favorite_category'],
        "favorite_item": request.data['favorite_item']
      }
      print(data)
      serializer = DetailedUserSerializer(user, data=data, partial=True)
      if serializer.is_valid():
        serializer.save()
        return Response({'status': 'updated'})
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
      """
      Returns a list of the first 5 Users who match
      the given search query.
      """
      query = request.query_params.get("query", None)
      users = User.objects.filter(hidden = False)
      if query:
        for term in query.split():
          users = users.filter(Q(username__istartswith = term) | Q(first_name__istartswith = term) | Q(last_name__istartswith = term))
      serializer = UserSerializer(users[:5], many = True)
      return Response(serializer.data)

    def create(self, request):
      """
      Creates a User from the given information
      """
      request.data['email'] = request.data['username'] + "@mit.edu"
      request.data['resident_type'] = ResidentType[request.data['resident_type']]
      serializer = UserSerializerWithToken(data=request.data)
      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def csv_upload(self, request, format=None):
      """
      Creates or updates a User for each row in the given CSV. If the
      Kerberos for a row exists, it only updates the other information.
      Otherwise, a new User object is created with the given information.
      """ 
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