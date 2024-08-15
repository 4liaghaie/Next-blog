from django.contrib import admin
from . models import Post

class Postadmin(admin.ModelAdmin):
    list_filter = ["created_at"]


admin.site.register(Post,Postadmin)





# Register your models here.
