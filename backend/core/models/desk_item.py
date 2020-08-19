from django.db import models

from .user import User


class CheckedOutItems(models.Manager):
    """
    A queryset that operates on all of the desk items that are currently checked out by residents
    """

    def get_queryset(self):
        return super().get_queryset().filter(checked_out=True)


class AvailableItems(models.Manager):
    """
    A queryset that operates on all of the desk items that are available to be checked out
    """

    def get_queryset(self):
        return super().get_queryset().filter(checked_out=False)


class DeskItem(models.Model):
    """
    Defines an object that can be checked out from the Simmons front desk
    """

    item = models.CharField(max_length=255, blank=False)
    time_out = models.DateTimeField()
    time_due = models.DateTimeField()
    checked_out = models.BooleanField(default=False, blank=False)
    resident = models.ForeignKey(User, on_delete=models.CASCADE, related_name="item_loaned")
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)

    available_objects = AvailableItems()
    checked_out_objects = CheckedOutItems()
    objects = models.Manager()