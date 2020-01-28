from django.core.management.base import BaseCommand
from core import utils


class Command(BaseCommand):
    def handle(self, *args, **options):
        utils.make_room_section_bindings()
        self.stdout.write(self.style.SUCCESS('Successfully bound Rooms to Sections in DB'))