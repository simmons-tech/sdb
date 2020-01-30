from django.contrib.auth import get_user_model
from django.db import models

from .room import UserRoom
from ..enums import ResidentType

User = get_user_model()


class Section(models.Model):
    name = models.CharField(max_length=20)

    def gras(self):
        user_rooms = UserRoom.current_objects.filter(room__section=self)
        user_room_ids = user_rooms.filter(user__resident_type=ResidentType.GRA).values_list('id')
        return User.objects.filter(userroom__id__in=user_room_ids)

    def __str__(self):
        return self.name
