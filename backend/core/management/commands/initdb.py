from django.core.management.base import BaseCommand
from os import path
import csv
from core import utils


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Update room sections in DB first
        utils.make_room_section_bindings()

        # Open and process sample user CSV
        basepath = path.dirname(__file__)
        filepath = path.abspath(path.join(basepath, '..', '..', '..', 'data', 'sample_user_csv.csv'))
        with open(filepath) as csvfile:
            reader = csv.DictReader(csvfile)
            utils.process_user_csv(reader)
        self.stdout.write(self.style.SUCCESS('Successfully initialized DB from sample user CSV'))