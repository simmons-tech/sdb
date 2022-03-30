from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (User, Administrator, Officer, Room, Section, UserRoom, Account, AccountGroup, DeskWorker,
                     DeskCaptain, Package, DeskItem, DeskNote, DeskShift, ItemLoan, Guest, OneTimeEvent)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = UserSerializer(user).data
        token['is_admin'] = Administrator.active_objects.filter(user=user).exists()
        token['is_desk_worker'] = DeskWorker.active_objects.filter(user=user).exists()
        token['is_desk_captain'] = DeskCaptain.active_objects.filter(user=user).exists()

        return token


class SectionNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('name',)


class RoomSerializer(serializers.ModelSerializer):
    section = SectionNameSerializer()
    number = serializers.CharField()

    class Meta:
        model = Room
        fields = ('number', 'section', 'capacity', 'num_occupants')


class UserSerializer(serializers.ModelSerializer):
    """
    All information that can be returned to a user upon login and in
    searches for other users. Assume that all this information can be
    revealed to all logged in users with no security risks.
    """
    room = RoomSerializer()

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'display_name',
            'title',
            'room',
            'year',
            'guest_list_renewal_mode',
            'pk'
        )


class SectionSerializer(serializers.ModelSerializer):
    gras = UserSerializer(many=True)

    class Meta:
        model = Section
        fields = ('name', 'gras')


# class GroupSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
#
#     class Meta:
#         model = User
#         fields = ('user',)


class OfficerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Officer
        fields = (
            'user',
            'title',
            'position',
        )


class UserRoomSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    room = RoomSerializer()

    # move_in_date = serializers.DateField(format=)

    class Meta:
        model = UserRoom
        fields = (
            'user',
            'move_in_date',
            'move_out_date',
            'room'
        )


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password')
        room_number = validated_data.pop('room')

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        # TODO: handle if Room doesn't exist
        room = Room.objects.get(number=room_number)
        instance.change_room(room)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token',
                  'first_name',
                  'last_name',
                  'year',
                  'room',
                  'resident_type',
                  'username',
                  'email',
                  'hidden',
                  'immortal'
                  )


class DetailedUserSerializer(serializers.ModelSerializer):
    room = RoomSerializer()

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'title',
            'year',
            'room',
            'home_city',
            'state',
            'country',
            'quote',
            'favorite_category',
            'favorite_item',
            'resident_type',
            'homepage',
            'cell_phone'
        )


class AccountSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'name',
            'balance'
        )


class AccountGroupSerializer(serializers.ModelSerializer):
    accounts = AccountSerializerBasic(many=True)

    class Meta:
        model = AccountGroup
        fields = (
            'name',
            'accounts'
        )


class PackageSerializer(serializers.ModelSerializer):
    recipient = UserSerializer()
    desk_worker = UserSerializer()

    class Meta:
        model = Package
        fields = (
            "recipient",
            "location",
            "quantity",
            "perishable",
            "log_time",
            "desk_worker",
            "num_picked_up",
            "pk",
        )


class DeskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeskItem
        fields = (
            'item',
            'quantity',
            'num_available',
            'location',
            'category',
            'pk',
        )


class ItemLoanSerializer(serializers.ModelSerializer):
    resident = UserSerializer()
    desk_worker = UserSerializer()
    item = DeskItemSerializer()

    class Meta:
        model = ItemLoan
        fields = (
            'item',
            'resident',
            'desk_worker',
            'num_checked_out',
            'time_out',
            'time_due',
            'pk',
        )


class DeskNoteSerializer(serializers.ModelSerializer):
    desk_worker = UserSerializer()

    class Meta:
        model = DeskNote
        fields = (
            "time",
            "content",
            "desk_worker",
            "completed",
            "pk",
        )

        required_fields = ('content', 'desk_worker')


class DeskShiftSerializer(serializers.ModelSerializer):
    desk_worker = UserSerializer()

    class Meta:
        model = DeskShift
        fields = (
            "start_time",
            "end_time",
            "desk_worker"
        )


class GuestSerializer(serializers.ModelSerializer):
    host = UserSerializer()

    class Meta:
        model = Guest
        fields = (
            'first_name',
            'last_name',
            'host',
            'pk'
        )


class OneTimeEventSerializer(serializers.ModelSerializer):
    host = UserSerializer()
    guest_list = GuestSerializer(many=True)

    class Meta:
        model=OneTimeEvent
        fields = (
            'name',
            'host',
            'start_time',
            'end_time',
            'guest_list',
            'pk'
        )