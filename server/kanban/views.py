from functools import partial
from rest_framework import viewsets
from .serializers import CardSerializer, ColumnSerializer
from django.shortcuts import get_object_or_404
from .models import Card, Column

from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.settings import api_settings


class CardViewSet(viewsets.ViewSet):
    queryset = Card.objects.all()  # required for basename

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def list(self, request):
        queryset = Card.objects.all()
        serializer = CardSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Card.objects.all()
        card = get_object_or_404(queryset, pk=pk)
        serializer = CardSerializer(card)
        return Response(serializer.data)

    def create(self, request):
        item = CardSerializer(data=request.data)
        # if Card.objects.filter(**request.data).exists():
        #     raise serializers.ValidationError('Data already exist in database')
        item.is_valid(raise_exception=True)
        item.save()
        return Response(item.data, status=status.HTTP_201_CREATED, headers=self.get_success_headers(item.data))

    def destroy(self, request, pk=None):
        card = get_object_or_404(self.queryset, pk=pk)

        try:
            card.delete()
            return Response({'details': f'Card with pk {pk} deleted successfully'}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        card = get_object_or_404(self.queryset, pk=pk)
        if 'column' in request.data:
            column = Column.objects.get(index=request.data['column'])
            card.column = column

        if 'index' in request.data:
            card.index = request.data['index']

        if 'body' in request.data:
            column = Column.objects.get(index=request.data['column'])
            card.column = column
            card.title = request.data['body']

        card.save()
        return Response(CardSerializer(card).data)


class ColumnViewSet(viewsets.ViewSet):
    queryset = Column.objects.all()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    def list(self, request):
        queryset = Column.objects.all()
        serializer = ColumnSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Column.objects.all()
        column = get_object_or_404(queryset, pk=pk)
        serializer = ColumnSerializer(column)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        column = get_object_or_404(self.queryset, pk=pk)

        if 'index' in request.data:
            column.index = request.data['index']
        column.save()
        return Response(ColumnSerializer(column).data)

    def create(self, request):
        item = ColumnSerializer(data=request.data)
        # if Card.objects.filter(**request.data).exists():
        #     raise serializers.ValidationError('Data already exist in database')
        item.is_valid(raise_exception=True)
        item.save()
        return Response(item.data, status=status.HTTP_201_CREATED, headers=self.get_success_headers(item.data))

    def update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        column = get_object_or_404(self.queryset, pk=pk)

        try:
            column.delete()
            return Response({'details': f'column with pk {pk} deleted successfully'}, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
