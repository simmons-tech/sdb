from django.db import models

from .user import User

class OneTimeEvent(models.Model):
    """
    A model representing a one-time event.
    """

    def __str__(self):
        return f'{self.name} - {self.host.username}'

    name = models.CharField(max_length=255, blank=False, null=False)
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name='one_time_events'
    )

    start_time = models.DateTimeField(blank=False, null=False)
    end_time = models.DateTimeField(blank=False, null=False)
