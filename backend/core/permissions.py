from rest_framework import permissions

from core.models.groups import SocialChair

from .models import Administrator, DeskWorker, DeskCaptain


class IsAdmin(permissions.BasePermission):
    """
    Global permission for admin only
    """

    def has_permission(self, request, view):
        return Administrator.active_objects.filter(user=request.user).exists()


class IsDeskWorker(permissions.BasePermission):
    """
    Permission for Desk Workers to access the desk worker pages
    """

    def has_permission(self, request, view):
        return (
            DeskWorker.active_objects.filter(user=request.user).exists() or
            DeskCaptain.active_objects.filter(user=request.user).exists()
        )


class IsDeskCaptain(permissions.BasePermission):
    """
    Permission for Desk Captain to access captain-specific pages
    """

    def has_permission(self, request, view):
        return DeskCaptain.active_objects.filter(user=request.user).exists()


class IsSocialChair(permissions.BasePermission):
    """
    Permission for Social Chair to create and edit lounges.
    """
    def has_permission(self, request, view):
        return SocialChair.active_objects.filter(user=request.user).exists()
