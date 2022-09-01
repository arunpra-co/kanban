from django.db import models


# Create your models here.

class TimeStampMixins(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class Cloumn(TimeStampMixins):
    title = models.CharField(max_length=50)
    index = models.IntegerField()
    def __str__(self):
        return f'{self.id}.{self.title}'
 
class Card(TimeStampMixins):
    body = models.CharField( max_length=50)
    column = models.OneToOneField(Cloumn,on_delete=models.CASCADE)
    index = models.IntegerField()
    def __str__(self):
        return f'{self.id}.{self.body}'

