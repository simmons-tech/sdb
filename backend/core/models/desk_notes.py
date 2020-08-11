from django.db import models

from .user import User


class DeskNotes(models.Model):
    """
    A model to keep track of various notes that can be used between desk workers at Simmons Desk
    """

    time = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
