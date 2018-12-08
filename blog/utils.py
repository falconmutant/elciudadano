from blog.variable import *


def display_format_date(date):
	date = date.strftime('%d %m %Y')
	day = date.split(' ')[0]
	month = number_to_months[int(date.split(' ')[1])]
	year = date.split(' ')[2]
	return '%s %s %s' % (day, month, year)
