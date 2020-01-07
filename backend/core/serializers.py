from rest_framework_jwt.serializers import JSONWebTokenSerializer

from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext as _
from rest_framework_jwt.settings import api_settings
from .models import User, Admin, Officer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['user'] = UserSerializer(user).data
    token['is_admin'] = Admin.objects.filter(user = user).exists()

    return token

class UserSerializer(serializers.ModelSerializer):
  """
  All information that can be returned to a user upon login and in
  searches for other users. Assume that all this information can be
  revealed publicly with no security risks.
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

class OfficerSerializer(serializers.ModelSerializer):
  username = serializers.CharField(source='user.username', read_only=True)
  display_name = serializers.CharField(source='user.display_name', read_only=True)
  room = serializers.CharField(source='user.room', read_only=True)
  email = serializers.EmailField(source='user.email', read_only=True)

  class Meta:
    model = Officer
    fields = (
      'username',
      'email',
      'display_name',
      'title',
      'position',
      'room',
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
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
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