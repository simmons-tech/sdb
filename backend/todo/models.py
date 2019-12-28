from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)
  owner = models.ForeignKey(User, related_name="todos",
                              on_delete=models.CASCADE, null=True)

  def _str_(self):
    return self.title
