from rest_framework import permissions

from .models import Administrator, DeskWorker


class IsAdmin(permissions.BasePermission):
    """
    Global permission for admin only
    """

    def has_permission(self, request, view):
        return Administrator.objects.filter(user=request.user).exists()


class IsDeskWorker(permissions.BasePermission):
    """
    Permission for Desk Workers to access the desk worker pages
    """

    def has_permission(self, request, view):
        return DeskWorker.objects.filter(user=request.user).exists()