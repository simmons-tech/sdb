import csv
import io
import random
from datetime import datetime

from django.db import transaction
from django.db.models import Q
from django.db.models.aggregates import Count
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .exceptions import InvalidUserCSVException
from .models import *
from .permissions import *
from .serializers import *
from .utils import process_user_csv


def deactivateRecord(item):
    item.is_active = False
    item.end_date = datetime.now()
    item.save()


def updateList(request, objects):
    usernames = request.data['usernames']
    for i, username in enumerate(usernames):
        try:
            if username:
                user = User.objects.get(username=username)
                objects.update_or_create(
                    user=user,
                    is_active=True,
                    defaults={"index": i}
                )
        except:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

    # Any usernames not included are not active
    to_deactivate = objects.filter(is_active=True).exclude(user__username__in=usernames).all()
    for entry in to_deactivate:
        deactivateRecord(entry)

    return Response({'status': 'updated'})


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
    if count != 0:
        index = random.randint(0, count - 1)
        user = qs.all()[index]
        serializer = DetailedUserSerializer(user)
        return Response({"is_user": True, "user": serializer.data})
    else:
        return Response({"is_user": False})


@api_view(['POST'])
@permission_classes([IsAdmin])
def impersonate(request):
    user = User.objects.get(username=request.data['username'])
    refresh = RefreshToken.for_user(user)
    refresh['user'] = UserSerializer(user).data
    refresh['is_admin'] = Administrator.objects.filter(user=user).exists()
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    })


class Medlinks(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Medlinks.
    POST requests add Medlinks and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = Medlink.active_objects.values_list('id')
    queryset = User.objects.filter(medlink__id__in=ids).order_by("medlink__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, Medlink.objects)


class AssociateAdvisors(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Associate Advisors.
    POST requests add Associate Advisors and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = AssociateAdvisor.active_objects.values_list('id')
    queryset = User.objects.filter(associateadvisor__id__in=ids).order_by("associateadvisor__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, AssociateAdvisor.objects)


class ResidentPeerMentors(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Resident Peer Mentors.
    POST requests add Resident Peer Mentors and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = ResidentPeerMentor.active_objects.values_list('id')
    queryset = User.objects.filter(residentpeermentor__id__in=ids).order_by("residentpeermentor__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, ResidentPeerMentor.objects)


class PleasureEducators(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Pleasure Educators.
    POST requests add Pleasure Educators and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = PleasureEducator.active_objects.values_list('id')
    queryset = User.objects.filter(pleasureeducator__id__in=ids).order_by("pleasureeducator__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, PleasureEducator.objects)


class Administrators(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Pleasure Educators.
    POST requests add Pleasure Educators and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = Administrator.active_objects.values_list('id').order_by("administrator__index")
    queryset = User.objects.filter(administrator__id__in=ids)
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, Administrator.objects)


class Officers(viewsets.ModelViewSet):
    """
    GET requests return a list of officers.
    POST requests records officers and records the order of usernames
    given. Any positions no longer held by any username in the POST
    request data is deactivated.
    """
    # TODO: make this entire method atomic, as in rolling back if there is an error
    # I know Django supports this functionality, so implementation should not be too hard

    queryset = Officer.active_objects
    serializer_class = OfficerSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        positions = request.data['positions']

        # Replace "NOBODY" with the username on the DB
        have_nobody = False
        for position in positions:
            if position['username'] == "NOBODY" or \
                    position['username'] == '':
                have_nobody = True
                position['username'] = settings.NOBODY_USERNAME

        if have_nobody:
            # Create the "NOBODY" User instance in case it doesn't exist yet
            User.nobody()

        officers = set([position['username'] for position in positions])

        for i, position in enumerate(positions):
            try:
                if position['title'] and position['position']:
                    user = User.objects.get(username=position['username'])
                    Officer.objects.update_or_create(
                        user=user,
                        is_active=True,
                        position=position['position'],
                        defaults={
                            "index": i,
                            "title": position['title']
                        }
                    )
            except:
                return Response(None, status=status.HTTP_400_BAD_REQUEST)

        # Get a list of every position this officer will hold
        # Any positions they used to hold that are _not_ in this list
        # will be deactivated
        for officer in officers:
            new_positions = set([position['position'] \
                                 for position in positions if position['username'] == officer])
            to_deactivate = Officer.objects.filter(is_active=True, user__username=officer) \
                .exclude(position__in=new_positions)
            for position in to_deactivate:
                deactivateRecord(position)

        # Any usernames not included are not active
        to_deactivate = Officer.objects.filter(is_active=True).exclude(user__username__in=officers).all()
        for entry in to_deactivate:
            deactivateRecord(entry)

        return Response({'status': 'updated'})


class RoomList(viewsets.ModelViewSet):
    queryset = UserRoom.current_objects
    serializer_class = UserRoomSerializer

    @action(detail=False, methods=['get'])
    def get_room_history(self, request):
        """
        Returns the move in/move out history of the room specified
        Query params:
            - room: the room number of the room to get the history for
        """
        room = request.query_params.get("room", None)
        if not room:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        query = UserRoom.objects.filter(room__number=room)
        return Response(UserRoomSerializer(query, many=True).data)

    @action(detail=False, methods=['get'])
    def get_user_history(self, request):
        """
        Returns the move in/move out history of the user specified
        Query params:
            - username: the username of the user to get the history for
        """
        username = request.query_params.get("username", None)
        if not username:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        query = UserRoom.objects.filter(user__username=username)
        return Response(UserRoomSerializer(query, many=True).data)

    @action(detail=False, methods=['get'])
    def get_overfilled_rooms(self, request):
        rooms = Room.overfilled_objects
        return Response(RoomSerializer(rooms, many=True).data)

    @action(detail=False, methods=['get'])
    def get_underfilled_rooms(self, request):
        rooms = Room.underfilled_objects
        return Response(RoomSerializer(rooms, many=True).data)


class SectionList(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionNameSerializer


class AccountsList(viewsets.ReadOnlyModelViewSet):
    """
    GET requests return a list of AccountGroups which contain the Name and Balance of every Account in the group.
    """
    queryset = AccountGroup.objects.all().prefetch_related("accounts")
    serializer_class = AccountGroupSerializer


class UserList(viewsets.ModelViewSet):
    queryset = User.objects.exclude(hidden=True).exclude(is_active=False)
    serializer_class = UserSerializer

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
        Form data expected:
            {
                "homepage",
                "cell_phone",
                "home_city",
                "state",
                "country",
                "quote",
                "favorite_category",
                "favorite_item"
            }
        """
        # TODO: make this check into a Django REST framework decorator
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

    @action(detail=False, methods=['get'])
    def advanced_search(self, request):
        """
        Returns a list of Users who partially match all of the given information. A partial match happens
        when a field starts (case-insensitive) with the specified string (for example, "lu" partial matches "Luke"
        and "lukebord")
        Expected (but optional) query params:
            - first_name
            - last_name
            - title
            - username
            - room
            - year
        """
        first_name = request.query_params.get("first_name", None)
        last_name = request.query_params.get("last_name", None)
        title = request.query_params.get("title", None)
        username = request.query_params.get("username", None)
        room = request.query_params.get("room", None)
        year = request.query_params.get("year", None)
        section = request.query_params.get("section", None)

        users = self.queryset
        if first_name:
            users = users.filter(first_name__istartswith=first_name)
        if last_name:
            users = users.filter(last_name__istartswith=last_name)
        if title:
            users = users.filter(title__istartswith=title)
        if username:
            users = users.filter(username__istartswith=username)
        if room:
            rooms = Room.objects.filter(number__istartswith=room)
            user_room_ids = UserRoom.current_objects.filter(room__in=rooms).values_list('id')
            users = users.filter(userroom__id__in=user_room_ids)
        if year:
            users = users.filter(year__iexact=year)
        if section:
            rooms = Room.objects.filter(section__name__istartswith=section)
            user_room_ids = UserRoom.current_objects.filter(room__in=rooms).values_list('id')
            users = users.filter(userroom__id__in=user_room_ids)

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def gras(self, request):
        """
        Returns a list of Users who are GRAs
        """
        gras = self.queryset.filter(resident_type=ResidentType.GRA)
        serializer = UserSerializer(gras, many=True)
        return Response(serializer.data)

    def list(self, request):
        """
        Returns a list of the first 5 Users who match
        the given search query.
        """
        query = request.query_params.get("query", None)
        users = self.queryset
        if query:
            for term in query.split():
                users = users.filter(
                    Q(username__istartswith=term) | Q(first_name__istartswith=term) | Q(last_name__istartswith=term))
        serializer = UserSerializer(users[:5], many=True)
        return Response(serializer.data)

    def create(self, request):
        """
        Creates a User from the given information
        """
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
        All User objects not included as a row in the CSV are marked as inactive
        """

        # Read the CSV
        user_csv = request.FILES['user_csv']
        user_csv.seek(0)
        reader = csv.DictReader(io.StringIO(user_csv.read().decode('utf-8')))

        try:
            with transaction.atomic():
                process_user_csv(reader)
        except InvalidUserCSVException as e:
            return Response({"rooms": [
                "Room %s does not exist. If it's supposed to, contact the tech chair." % str(item) for item in
                e.errors]}, status=status.HTTP_400_BAD_REQUEST)

        underfilled = RoomSerializer(Room.underfilled_objects, many=True).data
        overfilled = RoomSerializer(Room.overfilled_objects, many=True).data

        return Response({"underfilled": underfilled, "overfilled": overfilled})
