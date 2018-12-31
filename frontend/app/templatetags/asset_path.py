from pathlib import Path

from django import template
from django.conf import settings

register = template.Library()

# If the hot file exists, we're in dev mode, else production.
@register.simple_tag()
def asset_path():
    return 'http://localhost:8080/app/static' if settings.DEBUG and Path('./hot').is_file() else '/static'