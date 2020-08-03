from core import utils
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            utils.make_room_section_bindings()
            self.stdout.write(self.style.SUCCESS('Successfully bound Rooms to Sections in DB'))
        except Exception as e:
            raise CommandError(str(e))
