from django.db import models
from django.conf import settings
from datetime import date

today = date.today()

class CurrentUserRooms(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(move_in_date__lte=today, move_out_date__isnull=True)


class CurrentRooms(models.Manager):
    """
    A useful query to get all the room numbers that currently have students in them; should probably use
    UserRoom.current_objects instead because it'll give you a list of every student's current room (you cannot
    get an inhabitant directly from a Room object)
    """
    def get_queryset(self):
        return super().get_queryset().filter(userroom__move_in_date__lte=today, userroom__move_out_date__isnull=True)


class Section(models.Model):
    name = models.CharField(max_length=20)


class Room(models.Model):
    number = models.CharField(max_length=20)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, null=True)

    objects = models.Manager()
    current_objects = CurrentRooms()

    def __str__(self):
        return self.number


class SectionGRA(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    gra = models.ManyToManyField(settings.AUTH_USER_MODEL)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True, null=True)


class UserRoom(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    move_in_date = models.DateField(auto_now_add=True)
    move_out_date = models.DateField(blank=True, null=True)

    objects = models.Manager()
    current_objects = CurrentUserRooms()

    class Meta:
        ordering = ['-move_in_date']
