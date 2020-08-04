from django.conf import settings
from django.db import models

from .user import User


class Package(models.Model):
    """
    A model representing a package that is logged at the Simmons front desk.
    """

    log_time = models.DateTimeField(auto_now_add=True)
    location = models.CharField()
    quantity = models.IntegerField()
    perishable = models.BooleanField(default=False)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    desk_worker = models.CharField()  # TODO: Should this be linked to the User model? Or should it just be a CharField?
    picked_up = models.DateTimeField(blank=True)
