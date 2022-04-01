"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from core import views
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', views.UserList, 'user')
router.register(r'medlinks', views.Medlinks, 'medlinks')
router.register(r'associateadvisors', views.AssociateAdvisors, 'associateadvisors')
router.register(r'residentpeermentors', views.ResidentPeerMentors, 'residentpeermentors')
router.register(r'pleasureeducators', views.PleasureEducators, 'pleasureeducators')
router.register(r'administrators', views.Administrators, 'administrators')
router.register(r'deskworkers', views.DeskWorkers, 'deskworkers')
router.register(r'deskcaptains', views.DeskCaptains, 'deskcaptains')
router.register(r'socialchairs', views.SocialChairs, 'socialchairs')
router.register(r'officers', views.Officers, 'officers')
router.register(r'rooms', views.RoomList, 'rooms')
router.register(r'sections', views.SectionList, 'sections')
router.register(r'accounts', views.AccountsList, 'accounts')
router.register(r'packages', views.Packages, 'packages')
router.register(r'desknotes', views.DeskNotes, 'desknotes')
router.register(r'deskshifts', views.DeskShifts, 'deskshifts')
router.register(r'deskitems', views.DeskItems, 'deskitems')
router.register(r'loans', views.ItemLoans, 'loans')
router.register(r'guests', views.Guests, 'guests')
router.register(r'onetimeevents', views.OneTimeEvents, 'onetimeevents'),
router.register(r'lounges', views.Lounges, 'lounges')
router.register(r'loungeannouncements', views.LoungeAnnouncements, 'loungeannouncements')
router.register(r'loungeevents', views.LoungeEvents, 'loungeevents')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/fame/', views.highlighted_user),
    path('token_auth/', views.CustomTokenObtainPairView.as_view()),
    path('refresh_token/', TokenRefreshView.as_view()),
    path('impersonate/', views.impersonate),
    # path('users/', views.UserList.as_view())
]
