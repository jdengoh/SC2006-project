from django.apps import AppConfig


class MembersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'members'
    
class UsersConfig(AppConfig):
    name = 'users'

    def ready(self):
    	import users.signals
