from django.db import models


class Meeting(models.Model):
    name = models.CharField(max_length=255)
    meet_date = models.DateTimeField('meeting date')
    intro = models.CharField(max_length=255, null=True)
    house_announcements = models.TextField(null=True)
    president_announcements = models.TextField(null=True)
    committee_reports = models.TextField(null=True)

    def proposals(self):
        return Proposal.objects.filter(meeting=self)

    def __str__(self):
        return self.name


class Proposal(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    date = models.DateTimeField('submission date')
    primary_author = models.TextField()
    secondary_authors = models.TextField(null=True)
    title = models.CharField(max_length=60)
    procedure = models.TextField()
    procedure_notes = models.TextField(null=True)
    summary = models.TextField()
    full_text = models.TextField()

    approve = "AP"
    reject = "RE"
    moved = "MV"
    discuss = "DS"
    forum_approve = "AF"

    DECISION_CHOICES = [
        (approve, "APPROVED"),
        (reject, "REJECTED"),
        (discuss, "DISCUSSED"),
        (moved, "MOVED TO FULL FORUM"),
        (forum_approve, "APPROVED BY FULL FORUM"),
    ]
    decision = models.CharField(max_length=2, choices=DECISION_CHOICES, null=True)

    def __str__(self):
        return f'{self.title}\n{self.full_text}'

    def updates(self):
        return Update.objects.filter(proposal=self)


class Update(models.Model):
    date = models.DateTimeField('decision date')
    update = models.TextField()
    proposal = models.ForeignKey(Proposal, on_delete=models.CASCADE)

    def __str__(self):
        return self.update



