from rest_framework import permissions

from .models import Administrator


class IsAdmin(permissions.BasePermission):
    """
    Global permission for admin only
    """

    def has_permission(self, request, view):
        return Administrator.objects.filter(user=request.user).exists()
