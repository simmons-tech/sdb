from django.db import models


class AccountGroup(models.Model):
    """
    Represents a group of Account models.

    An account must be part of an AccountGroup, which is a collection
    of accounts that fall in some common theme. On the old DB, this would
    have been called an "Account" and the below Account model a "SubAccount"
    """
    name = models.CharField(max_length=256, unique=True)

    def __str__(self):
        return self.name


class Account(models.Model):
    """
    Represents an account/ledger for some entity on the database. Entities may
    be lounges or funding source, or just a generic house fund.

    An Account balance should be updated atomically with the creation of
    a new Transaction, so that the balance always reflects the sum of all
    transaction amounts related to the account.
    """
    name = models.CharField(max_length=256, unique=True)
    group = models.ForeignKey(AccountGroup,
                              related_name="accounts",
                              on_delete=models.CASCADE
                              )
    balance = models.IntegerField(default=0)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return "{}: {}".format(self.name, self.balance)


class Transaction(models.Model):
    """
    Represents some kind of monetary transaction that takes place for an
    account. These can either be deposits (aka a positive amount) or a
    withdrawal (aka a negative amount). These can be thought of as the rows
    of an Account where an Account functions as a ledger.
    """
    amount = models.IntegerField()
    account = models.ForeignKey(Account,
                                related_name="transactions",
                                on_delete=models.CASCADE
                                )
    description = models.CharField(max_length=2048)
    date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return "{}: {}".format(self.description, self.amount)
