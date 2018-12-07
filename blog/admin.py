from django.contrib import admin
from blog.models import *
# Register your models here.

admin.site.register(Gallery)
admin.site.register(NoticeType)
admin.site.register(Notice)
admin.site.register(Logger)