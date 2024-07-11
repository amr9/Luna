""" Defines admin module"""
from django.contrib import admin
from django.apps import apps

# Get all models inside the task_app
hair_color_changer_app_models = apps.get_app_config('hair_color_changer_app').get_models()

for model in hair_color_changer_app_models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
