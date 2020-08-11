from django.db import models

from .user import User


class DeskItem(models.Model):
    """
    Defines an object that can be checked out from the Simmons front desk
    """

    item = models.CharField(max_length=255, blank=False)
    time_out = models.DateTimeField()
    time_due = models.DateTimeField()
    checked_out = models.BooleanField(default=False)
    resident = models.ForeignKey(User, on_delete=models.CASCADE)
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)
