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
from blog.utils import *
from blog.variable import *
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


def impresa(requests):
	meses = []
	years = Notice.objects.all().distinct('date__year').order_by('-date__year')
	for year in years:
		months = Notice.objects.filter(date__year=str(year.date).split('-')[0]).distinct('date__month').order_by('-date__month')
		count = 0
		for month in months:
			if count == 0:
				month1 = number_to_months[int(str(month.date).split('-')[1])]
				count += 1
			elif count == 1:
				count += 1
			elif count == 2:
				month2 = number_to_months[int(str(month.date).split('-')[1])]
				meses.append(month2+' - '+month1+ ' '+str(month.date).split('-')[0])
				count = 0
				print(meses)
	return render(requests, 'impresa.html', locals())


class Pdf(APIView):
	def get(self, request, year, month1, month2):
		pos = 0
		for month in number_to_months:
			if month == month1:
				month1 = pos
			if month == month2:
				month2 = pos
			pos += 1
		notices = Notice.objects.filter(date__year=year, date__month__range=(month1, month2))
		data = []
		for notice in notices:
			data.append({
				'image': notice.file.get(is_cover=True).file.url,
				'text': notice.text,
				'title': notice.title
			})
		return Render.render('pdf.html', {'notices': data, 'url': 'https://elciudadanotamaulipas.mx/'})


class Single(APIView):
	def get(self, request, id):
		notice = Notice.objects.get(id=id)
		image = notice.file.get(is_cover=True).file.url
		return render(request, 'single.html', locals())


class Load(APIView):
	def post(self, request):
		data = []
		if request.data['target'] == 'initialize':
			notices = Notice.objects.filter(alive=True).order_by('-date')[:10]
			for notice in notices:
				core = notice.type.core
				core = core.replace('{id}', str(notice.id))
				core = core.replace('{date}', display_format_date(notice.date))
				core = core.replace('{image}', notice.file.get(is_cover=True).file.url)
				core = core.replace('{title}', notice.title)
				core = core.replace('{description}', notice.description)
				data.append({'article': core})
		data = json.dumps(data)
		return HttpResponse(data, status=status.HTTP_200_OK, content_type='application/json')
