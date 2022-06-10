from django.db import models
from solo.models import SingletonModel


class SocialChairSettings(SingletonModel):
    lounge_signups_open = models.BooleanField(blank=False, null=False, default=False)
    signup_value = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=30)
    member_threshold = models.IntegerField(blank=False, null=False, default=10)
    is_fall_semester = models.BooleanField(blank=False, null=False, default=True)

    def __str__(self):
        return "Social chair settings"
