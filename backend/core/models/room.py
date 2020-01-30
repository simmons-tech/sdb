from datetime import date

from django.conf import settings
from django.db import models
from django.db.models import F, CharField
from django.db.models.functions import Concat

today = date.today()


class RoomNumberManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().annotate(
            number=Concat(F('number_integer'), F('number_suffix'), output_field=CharField()))


class CurrentUserRooms(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(move_in_date__lte=today, move_out_date__isnull=True)


class UnderfilledRooms(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset().annotate(
            number=Concat(F('number_integer'), F('number_suffix'), output_field=CharField()))
        query_ids = [item.id for item in queryset if item.num_occupants() < item.capacity]
        return queryset.filter(id__in=query_ids)


class OverfilledRooms(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset().annotate(
            number=Concat(F('number_integer'), F('number_suffix'), output_field=CharField()))
        query_ids = [item.id for item in queryset if item.num_occupants() > item.capacity]
        return queryset.filter(id__in=query_ids)


class CurrentRooms(models.Manager):
    use_for_related_fields = True
    """
    A useful query to get all the room numbers that currently have students in them; should probably use
    UserRoom.current_objects instead because it'll give you a list of every student's current room (you cannot
    get an inhabitant directly from a Room object)
    """

    def get_queryset(self):
        return super().get_queryset().filter(userroom__move_in_date__lte=today,
                                             userroom__move_out_date__isnull=True).annotate(
            number=Concat(F('number_integer'), F('number_suffix'), output_field=CharField()))


class UserRoom(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)
    move_in_date = models.DateField(auto_now_add=True)
    move_out_date = models.DateField(blank=True, null=True)

    objects = models.Manager()
    current_objects = CurrentUserRooms()

    class Meta:
        ordering = ['-move_in_date']


class Room(models.Model):
    number_integer = models.IntegerField()
    number_suffix = models.CharField(max_length=3, blank=True)
    section = models.ForeignKey("section", on_delete=models.CASCADE, null=True)
    capacity = models.SmallIntegerField()

    objects = RoomNumberManager()
    current_objects = CurrentRooms()
    underfilled_objects = UnderfilledRooms()
    overfilled_objects = OverfilledRooms()

    def num_occupants(self):
        return UserRoom.current_objects.filter(room=self).count()

    def number(self):
        return str(self.number_integer) + self.number_suffix

    def __str__(self):
        return self.number

    class Meta:
        ordering = ['number_integer', 'number_suffix']
