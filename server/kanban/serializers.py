
from rest_framework import serializers

from .models import Card,Column

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model= Card
        fields='__all__'


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model=Column
        fields='__all__'

    