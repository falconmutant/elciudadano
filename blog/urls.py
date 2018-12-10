from django.conf.urls import url
from blog.views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
	url(r'^$', index),
	url(r'^single/(?P<id>[0-9]+)/$', Single.as_view()),
	url(r'^impresa/$', impresa),
	url(r'^pdf/(?P<year>\w+)/(?P<month1>\w+)/(?P<month2>\w+)/$', Pdf.as_view()),
	url(r'^get_auth_token/$', CustomObtainAuthToken.as_view(), name='get_auth_token'),
	url(r'^login/$', auth_views.LoginView.as_view(), {'template_name': 'login.html'}, name='login'),
	url(r'^lock/$', lock),
	url(r'^logout/$', logout_view, name='logout'),
	url(r'^Load/$', Load.as_view()),
]
