from django.db import models

from .user import User


class OpenDeskNote(models.Manager):
    """
    A queryset that shows all of the deskworker notes that have not been completed yet
    """

    def get_queryset(self):
        return super().get_queryset().filter(completed=True)


class DeskNote(models.Model):
    """
    A model to keep track of various notes that can be used between desk workers at Simmons Desk
    """

    time = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    desk_worker = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    current_objects = OpenDeskNote()
