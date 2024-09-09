from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import  csrf_exempt
from rest_framework.parsers import JSONParser 
import requests
from rest_framework.response import Response 
from rest_framework.decorators import api_view


from .translation_service import translate_text



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


#view that will handle translations
def translate_view(text, target_language='sw'):
    url = 'https://libretranslate.com/translate'
    payload = {
        'q': text,
        'source': 'en',
        'target': target_language
    }
    response = requests.post(url, data=payload)
    if response.headers['Content-Type'] == 'application/json':
        try:
            result = response.json()
            return result.get('translatedText', 'Translation error')
        except ValueError:
            return 'Translation error'
    else:
        return response.text  # Return raw text if not JSON
   