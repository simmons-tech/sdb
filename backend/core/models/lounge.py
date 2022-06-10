from django.db import models


class Lounge(models.Model):
    """
    A model representing a social lounge.
    """
    def __str__(self):
        return self.name
    
    # Used for the lounge mailing lists
    id = models.CharField(blank=False, null=False, max_length=20, primary_key=True)
    # The actual name of the lounge
    name = models.CharField(blank=False, null=False, max_length=255)

    # Budget goes up to 10 million dollars for now
    budget_allocated = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=0)
    budget_remaining = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=0)  

    # These should be set when a lounge is created but if the user is
    # deleted from the DB, we don't want the whole lounge to get yeeted
    first_contact = models.ForeignKey(
        'User',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='first_contact_for',
        default=None
    )
    second_contact = models.ForeignKey(
        'User',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='second_contact_for',
        default=None
    )
