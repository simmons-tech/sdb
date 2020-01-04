from django_cron import CronJobBase, Schedule
from django.db.models import Max
from .models import User, HighlightedUser
import random