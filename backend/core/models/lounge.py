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


MEMBER_THRESHOLD = 10
BUDGET_PER_MEMBER = 30
