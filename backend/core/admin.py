from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import *


class UserRoomAdmin(admin.ModelAdmin):
    readonly_fields = ('move_in_date',)
    fields = ('user', 'move_in_date', 'move_out_date', 'room')


admin.site.register(User)
admin.site.register(Medlink)
admin.site.register(Administrator)
admin.site.register(Officer)
admin.site.register(Room)
admin.site.register(UserRoom, UserRoomAdmin)
admin.site.register(Section)
admin.site.register(AccountGroup)
admin.site.register(Account)
admin.site.register(DeskWorker)
admin.site.register(DeskCaptain)
admin.site.register(Guest)
admin.site.register(OneTimeEvent)
admin.site.register(Lounge)
admin.site.register(LoungeEvent)
admin.site.register(LoungeAnnouncement)
admin.site.register(SocialChairSettings, SingletonModelAdmin)
