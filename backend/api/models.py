from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class GapImage(models.Model):
    image = models.ImageField(upload_to='gaps_images/') 
    alt_text = models.CharField(max_length=255, blank=True) 

    def __str__(self):
        return self.alt_text or self.image.name

class Gaps(models.Model):
    title = models.CharField(max_length=200 , verbose_name = _('Title'))
    image = models.ImageField(verbose_name=_('Image'))
    description = models.TextField(verbose_name=_('Description'))
    site_preparation = models.TextField(blank=True, null=True)  
    planting = models.TextField(blank=True, null=True)  
    fertilizer_application = models.TextField(blank=True, null=True)  
    pest_and_disease_control = models.TextField(blank=True, null=True) 
    harvesting = models.TextField(blank=True, null=True) 
    yield_information = models.TextField(blank=True, null=True)  
    images = models.ManyToManyField(GapImage)
  
    def __str__(self):
        return self.title 

    def get_image_url(self):
        return self.image.url if self.image else '/path/to/default/image.jpg'
        
class About(models.Model):
    title = models.CharField(max_length=100, verbose_name=_('Title'))
    content = models.TextField(verbose_name=_('Content'))

    def __str__(self):
        return self.title
    
