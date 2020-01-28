from .serializers import UserSerializer
from .models import User, Room, Section
from .enums import ResidentType
from os import path
import csv

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def process_user_csv(reader):
    # Stores all of the usernames included in CSV
    given_usernames = []

    for row in reader:
        given_usernames.append(row['username'])

        # Create or update the User for the specified username
        email = row['email'] if row['email'] else row['username'] + "@mit.edu"
        user, created = User.objects.update_or_create(
            username=row['username'],
            defaults={
                'email': email,
                'first_name': row['firstname'],
                'last_name': row['lastname'],
                'year': row['year'] if row['year'] else None,
                'resident_type': ResidentType[row['type']],
                'immortal': False,
                'hidden': False,
            }
        )

        # Move the User into their assigned room
        room = Room.objects.filter(number=row['room']).get()
        user.change_room(room)

        # Mark as active and save
        user.is_active = True
        user.save()

    # All User objects not included in the CSV get marked as inactive (assume they graduated/moved out)
    to_deactivate = User.objects.filter(is_active=True).exclude(username__in=given_usernames)
    for user in to_deactivate:
        # For development, staff accounts should remain active so that they can still log in :)
        if user.is_staff:
            continue
        user.is_active = False
        user.save()

def make_room_section_bindings():
    basepath = path.dirname(__file__)
    filepath = path.abspath(path.join(basepath, '..',  'data', 'room_sections.csv'))
    with open(filepath) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            section, _ = Section.objects.get_or_create(name=row['section'])
            Room.objects.update_or_create(
                number = row['room'],
                defaults={
                    'section': section
                }
            )
