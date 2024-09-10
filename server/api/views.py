from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import  csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework.response import Response 
from rest_framework.decorators import api_view


from  .models import Gaps
from .serializers import AboutSerializer, GapsSerializer
# Create your views here.

@api_view(['GET', 'POST'])
def gaps_list(request):

    if request.method == 'GET':
        gaps = Gaps.objects.all()
        serializer = GapsSerializer(gaps, many=True, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GapsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def getGap(request, pk):
    try:
        gap = Gaps.objects.get(id=pk)
    except Gaps.DoesNotExist:
        raise NotFound(detail = "Product not found")

    if request.method == "GET":
        serializer = GapsSerializer(gap, many=False, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = GapsSerializer(gap, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        gap.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



   