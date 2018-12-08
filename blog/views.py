import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, authenticate, login
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from blog.models import *
# Create your views here.


class CustomObtainAuthToken(ObtainAuthToken):
	def post(self, request, *args, **kwargs):
		response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
		token = Token.objects.get(key=response.data['token'])
		return Response({'token': token.key, 'id': token.user_id})


def logout_view(request):
	logout(request)
	return redirect('/login/?next=/')


def lock(request):
	if request.POST:
		user = authenticate(username=request.POST['username'], password=request.POST['password'])
		if user is not None:
			login(request, user)
			return redirect('/')
		else:
			foto = request.POST['foto']
			nombre = request.POST['nombre']
			username = request.POST['username']
			return render(request, 'registration/lock.html', locals())
	else:
		try:
			foto = '/static/img/user.jpg'
			nombre = request.user.first_name + ' ' + request.user.last_name
			username = request.user.username
			logout(request)
			return render(request, 'registration/lock.html', locals())
		except Exception as e:
			return redirect('/login/?next=/Panel/')


def index(request):
	return render(request, 'index.html', locals())


class Load(APIView):
	def post(self, request):
		data = []
		if request.data['target'] == 'initialize':
			notices = Notice.objects.filter(alive=True).order_by('date')[:10]
			for notice in notices:
				core = notice.type.core
				core = core.replace('{id}', str(notice.id))
				core = core.replace('{image}', notice.file.get(is_cover=True).file.url)
				core = core.replace('{title}', notice.title)
				core = core.replace('{description}', notice.description)
				data.append({'article': core})
		data = json.dumps(data)
		return HttpResponse(data, status=status.HTTP_200_OK, content_type='application/json')
