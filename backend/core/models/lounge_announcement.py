from datetime import datetime
from django.db import models


class LoungeAnnouncement(models.Model):
    """
    A model representing an announcement about lounges.
    """
    def __str__(self):
        return self.title
    
    title = models.CharField(max_length=1000, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    time_posted = models.DateTimeField(auto_now=True, blank=False, null=False)
