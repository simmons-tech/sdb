from django.db import models

from core.models.one_time_event import OneTimeEvent

from .user import User


class Guest(models.Model):
    """
    A model representing a guest on a guest list.
    """

    def __str__(self):
        if self.host != None:
            return f'{self.last_name}, {self.first_name} - {self.host.username}'
        return f'{self.last_name}, {self.first_name} - {self.event.host.username} ({self.event.name})'

    first_name = models.CharField(blank=False, null=False, max_length=255)
    last_name = models.CharField(blank=False, null=False, max_length=255)
    # If the guest is part of a one-time event, this field is null
    host = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='guest_list'
    )
    # A guest may or may not be part of a one-time event
    event = models.ForeignKey(
        OneTimeEvent,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='guest_list'
    )

    is_one_time = models.BooleanField(blank=False, null=False, default=False)
    validity_start_time = models.DateTimeField(blank=False, null=False)
    validity_end_time = models.DateTimeField(blank=False, null=False)
