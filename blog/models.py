from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.fields import JSONField

from blog.variable import *
# Create your models here.


class Gallery(models.Model):
	file = models.FileField()
	is_cover = models.BooleanField(null=False, default=True)
	alive = models.BooleanField(null=False, default=True)

	def __str__(self):
		return "%s" % self.file


class NoticeType(models.Model):
	type = models.TextField()
	core = models.TextField()
	alive = models.BooleanField(null=False, default=True)

	def __str__(self):
		return "%s" % self.type


class Notice(models.Model):
	title = models.TextField()
	data = models.DateField()
	description = models.TextField()
	text = models.TextField()
	type = models.ForeignKey(NoticeType, on_delete=models.CASCADE)
	file = models.ManyToManyField(Gallery)
	search = SearchVectorField(null=True, blank=True)
	alive = models.BooleanField(null=False, default=True)

	def __str__(self):
		return "%s" % self.title


class Logger(models.Model):
	notice = models.ForeignKey(Notice, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	date = models.DateTimeField(null=False)
	type = models.CharField(choices=LOGGER_STATUS, max_length=1, null=True)
	before = JSONField(null=True)
	after = JSONField(null=True)

	def __str__(self):
		return "%s %s %s" % (self.notice, self.user, self.date)
