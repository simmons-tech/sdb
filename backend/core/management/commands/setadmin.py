from core.models import User, Administrator
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Add given usernames to the Administrator group'

    def add_arguments(self, parser):
        parser.add_argument('usernames', nargs='+', type=str)

    def handle(self, *args, **options):
        i = Administrator.active_objects.count()
        for username in options['usernames']:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise CommandError('User "%s"$ does not exist' % username)
            Administrator.objects.update_or_create(
                user=user,
                is_active=True,
                defaults={"index": i}
            )
            self.stdout.write(self.style.SUCCESS('Successfully added "%s" to Administrators' % username))
