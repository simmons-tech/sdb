from django.db import models
from django.utils import timezone
from enumchoicefield import EnumChoiceField

from .user import User
from ..enums import DeskItemType


class CheckedOutItems(models.Manager):
    """
    A queryset that operates on all of the desk items that are currently checked out by residents
    """

    def get_queryset(self):
        return super().get_queryset().filter(num_available__lt=models.F('quantity'))


class AvailableItems(models.Manager):
    """
    A queryset that operates on all of the desk items that are available to be checked out
    """

    def get_queryset(self):
        return super().get_queryset().filter(num_available__gt=0)


class DeskItem(models.Model):
    """
    Defines an object that can be checked out from the Simmons front desk
    """

    item = models.CharField(max_length=255, blank=False, null=False)
    quantity = models.IntegerField(blank=False, null=False)
    num_available = models.IntegerField(blank=False, null=False)
    location = models.TextField()
    category = EnumChoiceField(
        enum_class=DeskItemType,
        default=DeskItemType.OTHER,
    )

    available_objects = AvailableItems()
    checked_out_objects = CheckedOutItems()
    objects = models.Manager()


class OverdueLoans(models.Manager):
    """
    A queryset that returns all loans that are overdue
    """

    def get_queryset(self):
        return super().get_queryset().filter(time_due__gt=timezone.now())


class ItemLoan(models.Model):
    """
    Acts as a middle-man between DeskItem and Users so that each item can have bulk quantities and have individual
    checkouts tracked
    """

    item = models.ForeignKey(DeskItem,
                             on_delete=models.CASCADE,
                             related_name='loan',
                             blank=False,
                             null=False)
    resident = models.ForeignKey(User,
                                 on_delete=models.CASCADE,
                                 related_name='loan',
                                 blank=False,
                                 null=False)
    desk_worker = models.ForeignKey(User,
                                    on_delete=models.CASCADE,
                                    blank=False,
                                    null=False)
    num_checked_out = models.IntegerField(blank=False, null=False)
    time_out = models.DateTimeField(auto_now_add=True)
    time_due = models.DateTimeField()

    objects = models.Manager()
    overdue = OverdueLoans()
