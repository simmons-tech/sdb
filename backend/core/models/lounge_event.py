from django.db import models

from .lounge import Lounge
from .user import User


class LoungeEvent(models.Model):
    """
    A model representing a lounge event.
    """

    def __str__(self):
        return f'{self.lounge} event on {self.date}'
    
    lounge = models.ForeignKey(
        Lounge,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name='events'
    )
    date = models.DateField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    approvers = models.ManyToManyField(User, related_name='approved_lounge_events', blank=True)
    disapprovers = models.ManyToManyField(User, related_name='disapproved_lounge_events', blank=True)
    goers = models.ManyToManyField(User, related_name='going_lounge_events', blank=True)

    # Metadata
    cancelled = models.BooleanField(blank=False, null=False, default=False)
    time_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    user_created = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='created_lounge_events'
    )
    participants = models.IntegerField(blank=False, null=False, default=0)
