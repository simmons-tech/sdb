from rest_framework import permissions
from .models import Admin, Medlink

class IsAdmin(permissions.BasePermission):
  """
  Global permission for admin only
  """
  def has_permission(self, request, view):
    return Admin.objects.filter(user = request.user).exists()