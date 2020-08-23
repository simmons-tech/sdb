from django.db import models
from datetime import datetime, timedelta

from .user import User


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

    available_objects = AvailableItems()
    checked_out_objects = CheckedOutItems()
    objects = models.Manager()

    @property
    def num_available(self):
        """
        Returns the number of objects that are still available to be checked out by summing the quantities of all
        "checkout" models

        :return: an integer representing the number of this item that are available
        """

        total_checked_out = 0
        for loan in self.loan:
            total_checked_out += loan.num_checked_out

        return int(self.quantity) - total_checked_out


class OverdueLoans(models.Manager):
    """
    A queryset that returns all loans that are overdue
    """

    def get_queryset(self):
        return super().get_queryset().filter(time_due__lt=datetime.now())


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
    hours_loaned = models.IntegerField()

    objects = models.Manager()
    overdue = OverdueLoans()

    @property
    def time_due(self):
        """
        Returns the DateTime when this loan expires
        :return: DateTime object defined by time_out + hours_loaned
        """

        return self.time_out + timedelta(hours=self.hours_loaned)
