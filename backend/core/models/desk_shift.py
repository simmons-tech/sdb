from django.db import models

from .user import User


class DeskShift(models.Model):
    """
    A model that keeps track of the schedule of the simmons desk workers
    """

    start_time = models.DateTimeField(blank=False)
    end_time = models.DateTimeField(blank=False)
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)