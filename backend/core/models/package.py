from django.conf import settings
from django.db import models

from .user import User


class WaitingPackages(models.Manager):
    """
    A queryset that returns all of the packages that have yet to be picked up
    from desk. Should be accessed through Package.current_objects
    """

    def get_queryset(self):
        return super().get_queryset().filter(package__picked_up=True)


class Package(models.Model):
    """
    A model representing a package that is logged at the Simmons front desk.
    """

    log_time = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    quantity = models.IntegerField()
    perishable = models.BooleanField(default=False)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_package")
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)
    picked_up = models.DateTimeField(blank=True)

    current_objects = WaitingPackages()
