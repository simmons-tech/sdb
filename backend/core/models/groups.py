from django.conf import settings
from django.db import models


class ActiveGroup(models.Manager):
    def get_queryset(selfself):
        return super().get_queryset().filter(is_active=True)


class Group(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    index = models.PositiveSmallIntegerField()
    is_active = models.BooleanField(default=True)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(blank=True, null=True)

    active_objects = ActiveGroup()
    objects = models.Manager()

    def __str__(self):
        return self.user.username

    class Meta:
        abstract = True
        ordering = ['index']


class Administrator(Group):
    pass


class Officer(Group):
    position = models.CharField(max_length=255)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.position + ": " + self.user.username


class Medlink(Group):
    pass


class AssociateAdvisor(Group):
    pass


class ResidentPeerMentor(Group):
    pass


class PleasureEducator(Group):
    pass


class DeskWorker(Group):
    pass


class DeskCaptain(Group):
    pass


class SocialChair(Group):
    pass
