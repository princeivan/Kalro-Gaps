from .models import About,Gaps, GapImage  
from rest_framework import serializers

class GapImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GapImage
        fields = ['id', 'image', 'alt_text']

class GapsSerializer(serializers.ModelSerializer):
    images = GapImageSerializer(many=True)
    image_url = serializers.SerializerMethodField()
    image_url = serializers.URLField(write_only=True, required=False)
    
    class Meta:
        model = Gaps
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'