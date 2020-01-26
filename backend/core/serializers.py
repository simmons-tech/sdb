from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, Administrator, Officer, Room, Section, UserRoom


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user'] = UserSerializer(user).data
        token['is_admin'] = Administrator.objects.filter(user=user).exists()

        return token


class UserSerializer(serializers.ModelSerializer):
    """
    All information that can be returned to a user upon login and in
    searches for other users. Assume that all this information can be
    revealed to all logged in users with no security risks.
    """

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
            'pk'
        )

class GroupSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = User
        fields = ('user',)


class OfficerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Officer
        fields = (
            'user',
            'title',
            'position',
        )


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('name',)


class RoomSerializer(serializers.ModelSerializer):
    section = SectionSerializer()

    class Meta:
        model = Room
        fields = ('number', 'section')


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
        instance.change_room(room_number)
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
