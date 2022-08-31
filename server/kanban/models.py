from django.db import models

# Create your models here.

class TimeStampMixins(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class cloumn(TimeStampMixins):
    title = models.CharField(_(""), max_length=50)
 


class Card(TimeStampMixins):
    body = models.CharField(_(""), max_length=50)

