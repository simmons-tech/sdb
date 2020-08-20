import csv
import io
import random
from datetime import datetime, timedelta

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
    to_deactivate = objects.filter(is_active=True).exclude(
        user__username__in=usernames).all()
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
    queryset = User.objects.filter(
        medlink__id__in=ids).order_by("medlink__index")
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
    queryset = User.objects.filter(
        associateadvisor__id__in=ids).order_by("associateadvisor__index")
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
    queryset = User.objects.filter(residentpeermentor__id__in=ids).order_by(
        "residentpeermentor__index")
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
    queryset = User.objects.filter(
        pleasureeducator__id__in=ids).order_by("pleasureeducator__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, PleasureEducator.objects)


class DeskWorkers(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Desk Workers.
    POST requests add Desk Workers and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = DeskWorker.active_objects.values_list('id')
    queryset = User.objects.filter(
        deskworker__id__in=ids).order_by("deskworker__index")
    serializer_class = UserSerializer

    @permission_classes([IsAdmin])
    def create(self, request):
        return updateList(request, DeskWorker.objects)


class Administrators(viewsets.ModelViewSet):
    """
    GET requests return a list of Users that are active Pleasure Educators.
    POST requests add Pleasure Educators and records the order of usernames
    given. Any usernames not in the POST request are set as inactive.
    """
    ids = Administrator.active_objects.values_list(
        'id').order_by("administrator__index")
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
            new_positions = set([position['position']
                                 for position in positions if position['username'] == officer])
            to_deactivate = Officer.objects.filter(is_active=True, user__username=officer) \
                .exclude(position__in=new_positions)
            for position in to_deactivate:
                deactivateRecord(position)

        # Any usernames not included are not active
        to_deactivate = Officer.objects.filter(
            is_active=True).exclude(user__username__in=officers).all()
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
            user_room_ids = UserRoom.current_objects.filter(
                room__in=rooms).values_list('id')
            users = users.filter(userroom__id__in=user_room_ids)
        if year:
            users = users.filter(year__iexact=year)
        if section:
            rooms = Room.objects.filter(section__name__istartswith=section)
            user_room_ids = UserRoom.current_objects.filter(
                room__in=rooms).values_list('id')
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

    @action(detail=True, methods=['get'])
    def packages(self, request, pk=None):
        """
        Returns a list of Packages that belong to the current user

        :param request: DRF Request object
        :param pk: Pk of the user making the query
        :return: DRF Response object
        """

        # Verify that the user making the request is actually the current user
        user = self.get_object()
        if user.pk != self.request.user.pk:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)

        # Get all packages from this user
        user_packages = user.received_package
        serializer = PackageSerializer(user_packages, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def loaned_items(self, request, pk=None):
        """
        Returns a listing of all items that the user has loaned from desk.

        :param request: DRF Request object
        :param pk: Pk of the user making the query
        :return: DRF Response object
        """

        # Verify that the user making the request is actually the current user
        user = self.get_object()
        if user.pk != self.request.user.pk:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)

        # Get all loaned items for this user
        user_items = user.item_loaned
        serializer = DeskItemSerializer(user_items, many=True)
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


class Packages(viewsets.ModelViewSet):
    permission_classes = [IsDeskWorker]

    queryset = Package.current_objects
    serializer_class = PackageSerializer

    @action(detail=False, methods=['post'])
    def user_packages(self, request):
        """
        Queries the database and retrieves all packages that belong to a given user based on their username

        :param request: DRF Request object
        :return: DRF Response object containing the packages of the requested user
        """

        recipient_username = request.data.get('recipient')['username']
        recipient = User.objects.get(username=recipient_username)

        packages = recipient.received_package
        serializer = PackageSerializer(packages, many=True)

        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def log(self, request):
        """
        Logs listing of packages in the system, and adds it to the database under
        the name of the desk worker that submits the post request

        :param request: DRF Request object
        :return: DRF Response object
        """

        worker_username = request.data['desk_worker']['username']
        desk_worker = User.objects.get(username=worker_username)
        packages = request.data['packages']

        # Verify that a desk worker is making the request (and that the package is logged under themselves)
        if desk_worker.pk != request.user.pk:
            return Response(None, status.HTTP_401_UNAUTHORIZED)

        for user_package in packages:

            recipient_username = user_package['username']
            recipient = User.objects.get(username=recipient_username)

            data = {
                'location': user_package['location'],
                'quantity': user_package['quantity'],
                'perishable': user_package['perishable'] == 'true',
            }

            Package.objects.create(desk_worker=desk_worker,
                                   recipient=recipient, **data)

        return Response({'status': 'created'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def pickup(self, request, pk=None):
        """
        Marks the package as picked up in the DB.

        :param request: DRF Request object
        :param pk: the pk of the package that is being picked up
        :return: DRF Response object
        """

        picked_up_package = self.get_object()
        num_picked_up = request.data['num_picked_up']

        # Make sure that the number of packages being picked up makes sense
        expected_max_pickup = picked_up_package.quantity - picked_up_package.num_picked_up
        if num_picked_up > expected_max_pickup:
            return Response({'status': 'More picked up than allowed'}, status=status.HTTP_400_BAD_REQUEST)

        picked_up_package.num_picked_up += num_picked_up
        picked_up_package.save()

        return Response({'status': 'updated'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def bulk_pickup(self, request):
        """
        Allows bulk pickup requests from desk

        :param request: DRF Request object
        :return: DRF Response object
        """

        packages = request.data['packages']
        for picked_up_package in packages:
            package_pk = picked_up_package['pk']
            num_picked_up = picked_up_package['num_picked_up']
            package_object = Package.objects.get(pk=package_pk)

            expected_max_pickup = package_object.quantity - package_object.num_picked_up
            if num_picked_up > expected_max_pickup:
                return Response({'status': 'More picked up than allowed'}, status=status.HTTP_400_BAD_REQUEST)

            package_object.num_picked_up += num_picked_up
            package_object.save()

        return Response({'status': 'updated'}, status=status.HTTP_200_OK)


class DeskItems(viewsets.ModelViewSet):
    permission_classes = [IsDeskWorker]

    queryset = DeskItem.objects.all()
    serializer_class = DeskItemSerializer

    @action(detail=False, methods=['get'])
    def available(self, request):
        """
        Returns a listing of all of the desk items that are currently not loaned out

        :param request: DRF Request Object
        :return: DRF Response Object
        """

        available_items = DeskItem.available_objects.get_queryset()
        serializer = DeskItemSerializer(available_items, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def out(self, request):
        """
        Returns a listing of all of the desk items that are loaned out from desk
        :param request: DRF Request object
        :return: DRF Response object
        """

        out_items = DeskItem.checked_out_objects.get_queryset()
        serializer = DeskItemSerializer(out_items, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def checkout(self, request):
        """
        Checks out a given item from the front desk, marking the given resident as the one that checked it out

        :param request: DRF Request object
        :return: DRF Response object
        """
        item = self.get_object()

        if item is None or item.checked_out:
            return Response({'status': 'Item is already checked out'}, status.HTTP_400_BAD_REQUEST)

        worker_pk = request.data['desk_worker']['pk']
        resident_pk = request.data['resident']['pk']

        hours_loaned = request.data['hours_loaned']

        item.desk_worker = User.objects.get(pk=worker_pk)
        item.resident = User.objects.get(pk=resident_pk)
        item.checked_out = True
        item.time_out = datetime.now()
        item.time_due = datetime.now() + timedelta(hours=hours_loaned)

        item.save()

        return Response({'status': 'success'}, status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def ret(self, request):
        """
        Returns the specified item to the front desk, and removes all "checked out" properties of the item
        :param request: DRF Request object
        :return: DRF Response object
        """

        item = self.get_object()

        if item is None or not item.checked_out:
            return Response({'status': 'item is not checked out'}, status.HTTP_400_BAD_REQUEST)

        item.desk_worker = None
        item.resident = None
        item.checked_out = False
        item.time_out = None
        item.time_due = None

        return Response({'status': 'item is returned'}, status.HTTP_200_OK)


class DeskNotes(viewsets.ModelViewSet):
    permission_classes = [IsDeskWorker]

    queryset = DeskNote.current_objects
    serializer_class = DeskNoteSerializer

    def create(self, request):

        try:
            # Get the desk_worker that is creating the note
            worker_pk = request.data.pop('desk_worker')['pk']
            desk_worker = User.objects.get(pk=worker_pk)

            DeskNote.objects.create(desk_worker=desk_worker, **request.data)

        # If something goes wrong, you want to ensure that you send a 400
        except:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'created'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """
        Marks the specified desknote as completed in the system

        :param request: DRF Request object
        :param pk: pk of the note being marked as completed
        :return: DRF Response object
        """
        note = self.get_object()

        note.completed = True
        note.save()

        return Response({'status': 'updated'}, status=status.HTTP_200_OK)


class DeskShifts(viewsets.ModelViewSet):
    permission_classes = [IsDeskWorker]

    queryset = DeskShift.current_objects
    serializer_class = DeskShiftSerializer
