from django.conf import settings
from django.db import models
from django.db.models import F

from .user import User


class WaitingPackages(models.Manager):
    """
    A queryset that returns all of the packages that have yet to be picked up
    from desk. Should be accessed through Package.current_objects
    """

    def get_queryset(self):
        return super().get_queryset().filter(num_picked_up__lt=F('quantity'))


class Package(models.Model):
    """
    A model representing a package that is logged at the Simmons front desk.
    """

    log_time = models.DateTimeField(auto_now_add=True,
                                    blank=False,
                                    null=False)
    location = models.CharField(blank=False,
                                null=False,
                                max_length=255)
    quantity = models.IntegerField(blank=False,
                                   null=False)
    num_picked_up = models.IntegerField(default=0,
                                        blank=False,
                                        null=False)
    perishable = models.BooleanField(blank=False,
                                     null=False,
                                     default=False)
    recipient = models.ForeignKey(User,
                                  on_delete=models.CASCADE,
                                  related_name="received_package",
                                  blank=False,
                                  null=False)
    desk_worker = models.ForeignKey(User,
                                    on_delete=models.CASCADE,
                                    blank=False,
                                    null=False)

    current_objects = WaitingPackages()
    objects = models.Manager()

    def save(self):

        # Ensure sanity by making sure the number picked up is always <= the number logged
        if self.num_picked_up > self.quantity:
            self.num_picked_up = self.quantity

        super().save()
