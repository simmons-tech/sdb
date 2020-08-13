import csv
from os import path

from core import utils
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Update room sections in DB first
        try:
            utils.make_room_section_bindings()
        except Exception as e:
            raise CommandError(str(e))

        # Open and process sample user CSV
        basepath = path.dirname(__file__)
        filepath = path.abspath(path.join(basepath, '..', '..', '..', 'data', 'sample_user_csv.csv'))
        with open(filepath) as csvfile:
            reader = csv.DictReader(csvfile)
            # TODO: check if Rooms exist
            utils.process_user_csv(reader)
        self.stdout.write(self.style.SUCCESS('Successfully initialized DB from sample user CSV'))
