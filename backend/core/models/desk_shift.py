from django.db import models
from datetime import date

from .user import User


class RemainingDeskShifts(models.Manager):
    """
    A queryset that returns all shifts that have not happened yet
    """

    def get_queryset(self):
        return super().get_queryset() \
            .filter(start_time__lte=date.today())


class DeskShift(models.Model):
    """
    A model that keeps track of the schedule of the simmons desk workers
    """

    start_time = models.DateTimeField(blank=False)
    end_time = models.DateTimeField(blank=False)
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)

    current_objects = RemainingDeskShifts()