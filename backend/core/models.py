from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from enumchoicefield import EnumChoiceField
from .enums import ResidentType

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
      username="_NOBODY",
      defaults = {
        "first_name": "nobody",
        "last_name": "nobody",
        "email": "simmons-request@mit.edu",
        "room": "",
        "hidden": True,
        "immortal": True
      }
    )

  def display_name(self):
    if self.username == "_NOBODY":
      return "NOBODY"
    if self.title:
      return "{} {} {}".format(self.first_name, self.title, self.last_name)
    else:
      return "{} {}".format(self.first_name, self.last_name)
    
  # Nickname
  title = models.CharField(max_length=255, blank=True)

  # Rooming info
  room = models.CharField(max_length=20, blank=True)
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
  # roles = models.ManyToManyField(Role)

  # Guest lists (TODO)

  REQUIRED_FIELDS  = ['year', 'first_name', 'last_name']

  class Meta:
        ordering = ['username']

class Admin(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)

class Officer(models.Model):
  position = models.CharField(max_length=255)
  title = models.CharField(max_length=255)

  index = models.PositiveSmallIntegerField()
  is_active = models.BooleanField(default=True)
  start_date = models.DateField(auto_now_add=True)
  end_date = models.DateField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.position + ": " + self.user.username

  class Meta:
    ordering = ['index']
    
class Medlink(models.Model):
  index = models.PositiveSmallIntegerField()
  is_active = models.BooleanField(default=True)
  start_date = models.DateField(auto_now_add=True)
  end_date = models.DateField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.user.username

class AssociateAdvisor(models.Model):
  index = models.PositiveSmallIntegerField()
  is_active = models.BooleanField(default=True)
  start_date = models.DateField(auto_now_add=True)
  end_date = models.DateField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.user.username

class ResidentPeerMentor(models.Model):
  index = models.PositiveSmallIntegerField()
  is_active = models.BooleanField(default=True)
  start_date = models.DateField(auto_now_add=True)
  end_date = models.DateField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.user.username

class PleasureEducator(models.Model):
  index = models.PositiveSmallIntegerField()
  is_active = models.BooleanField(default=True)
  start_date = models.DateField(auto_now_add=True)
  end_date = models.DateField(blank=True, null=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return self.user.username

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  owner = models.ForeignKey(User, related_name="todos",
                              on_delete=models.CASCADE, null=True)

  def _str_(self):
    return self.title
