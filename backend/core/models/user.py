from datetime import date

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from enumchoicefield import EnumChoiceField

from ..enums import ResidentType


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class User(AbstractUser):
    """
    A user of the Simmons DB, which almost always (with some exceptions)
    corresponds to a resident of Simmons Hall.

    We extend AbstractUser instead of AbstractBaseUser since we do not
    need to modify Django's base authentication process. Since we use
    the Django REST Framework, we implementing logging in with JWT
    tokens and a custom DEFAULT_AUTHENTICATION_CLASS (see TODO). Extending
    AbstractUser lets us ass new fields to the default User class while
    keeping the authentication process on the Admin page.
    """

    @classmethod
    def nobody(cls):
        return User.objects.get_or_create(
            username=settings.NOBODY_USERNAME,
            defaults={
                "first_name": "nobody",
                "last_name": "nobody",
                "email": "simmons-request@mit.edu",
                "hidden": True,
                "immortal": True
            }
        )

    def display_name(self):
        if self.username == settings.NOBODY_USERNAME:
            return "NOBODY"
        if self.title:
            return "{} {} {}".format(self.first_name, self.title, self.last_name)
        else:
            return "{} {}".format(self.first_name, self.last_name)

    def room(self):
        """
        Each User should only have at most one active room at a time. If the current User has more than one active room,
        this function will raise a MultipleObjectsReturned error. If the current User has no active room, this function
        will return None. Otherwise, this function returns the Room object that represents the Room the current User
        lives in.
        """
        user_rooms = self.userroom_set(manager="current_objects")
        if not user_rooms.exists():
            return None
        else:
            return self.userroom_set(manager="current_objects").get().room

    def change_room(self, new_room):
        old_room = self.room()

        if old_room == new_room:
            # Don't do anything since they haven't changed rooms
            return

        if old_room:
            # Mark that they moved out of previous room
            old_user_room = self.userroom_set(manager="current_objects").get()
            old_user_room.move_out_date = date.today()
            old_user_room.save()

        if new_room:
            # Mark that they moved into new room
            UserRoom.objects.create(user=self, room=new_room)

    # Nickname
    title = models.CharField(max_length=255, blank=True)

    # Rooming info
    year = models.IntegerField(blank=True, null=True)
    # This really should be required (without a default), but
    # we cannot input it during "createsuperuser." So we give it
    # a default and manually check it during regular user creation.
    resident_type = EnumChoiceField(
        enum_class=ResidentType,
        default=ResidentType.OTHER
    )

    # Profile info
    homepage = models.CharField(max_length=255, blank=True)
    cell_phone = models.CharField(max_length=20, blank=True)
    home_city = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    quote = models.TextField(max_length=1000, blank=True)
    favorite_category = models.CharField(max_length=255, blank=True)
    favorite_item = models.CharField(max_length=255, blank=True)

    # Meta info
    immortal = models.BooleanField(default=False)
    hidden = models.BooleanField(default=False)
    # roles = models.ManyToManyField(Role)

    # Guest lists (TODO)

    REQUIRED_FIELDS = ['year', 'first_name', 'last_name']

    class Meta:
        ordering = ['username']
        app_label = 'core'
