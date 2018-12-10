from weasyprint import HTML, CSS
from django.template.loader import get_template
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
		html = template.render(params)
		pdf_file = HTML(string=html).write_pdf()
		response = HttpResponse(pdf_file, content_type='application/pdf')
		response['Content-Disposition'] = 'filename="home_page.pdf"'
		return response
