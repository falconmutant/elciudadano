from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import xhtml2pdf.pisa as pisa

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
		html = template.render(params)
		response = BytesIO()
		pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), response)
		if not pdf.err:
			return HttpResponse(response.getvalue(), content_type='application/pdf')
		else:
			return HttpResponse("Error Rendering PDF", status=400)
