from io import StringIO
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse

from blog.variable import *


def display_format_date(date):
	date = date.strftime('%d %m %Y')
	day = date.split(' ')[0]
	month = number_to_months[int(date.split(' ')[1])]
	year = date.split(' ')[2]
	return '%s %s %s' % (day, month, year)


class Render:

	@staticmethod
	def render(path, params):
		template = get_template(path)
		context = Context(params)
		html = template.render(context)
		result = StringIO()
		pdf = pisa.pisaDocument(StringIO(html.encode("ISO-8859-1")), result)
		if not pdf.err:
			return HttpResponse(result.getvalue(), content_type='application/pdf')
		else:
			return HttpResponse("Error Rendering PDF", status=400)
