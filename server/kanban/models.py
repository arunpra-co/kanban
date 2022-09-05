from re import I
from django.db import models
# from django.db.models import Max


class TimeStampMixins(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


def incrementColumnIndexByOne():
    if  len(Column.objects.all()) >0:
        return  int(Column.objects.latest('index').index) +1

    return 0

def incrementCardIndexByOne():
    if  len(Card.objects.all()) >0:
        return  int(Card.objects.latest('index').index) +1

    return 0

class Column(TimeStampMixins):
    title = models.CharField(max_length=50)
    index = models.IntegerField(default=incrementColumnIndexByOne )
    def __str__(self):
        return f'{self.id} {self.index}.{self.title}'
 
class Card(TimeStampMixins):
    body = models.CharField( max_length=50)
    column = models.ForeignKey(Column,on_delete=models.CASCADE)
    index = models.IntegerField(default=incrementCardIndexByOne )
    def __str__(self):
        return f'id: {self.id}  /  Index: {self.index} / column: {self.column.index}   .  {self.body}'
