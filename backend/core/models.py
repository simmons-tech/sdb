from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from enumchoicefield import EnumChoiceField
from .enums import ResidentType

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
  # Nickname
  title = models.CharField(max_length=255, blank=True)

  # Rooming info
  room = models.CharField(max_length=20)
  year = models.IntegerField(blank=True, null=True)
  # This really should be required (without a default), but 
  # we cannot input it during "createsuperuser." So we give it
  # a default and manually check it during regular user creation.
  resident_type = EnumChoiceField(
    enum_class = ResidentType,
    default = ResidentType.OTHER
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
  immortal = models.BooleanField(default = False)
  hidden = models.BooleanField(default = False)

  # Guest lists (TODO)

  REQUIRED_FIELDS  = ['year', 'first_name', 'last_name']

class HighlightedUser(models.Model):
  """
  The 15 Seconds of Fame resident to show on the home page. There
  should only ever be one instance of this model.
  """
  user = models.ForeignKey(User,
                              on_delete=models.CASCADE)

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  owner = models.ForeignKey(User, related_name="todos",
                              on_delete=models.CASCADE, null=True)

  def _str_(self):
    return self.title
