from django.contrib import admin

# Register your models here.
from .models import About, Gaps,GapImage

admin.site.register(About)
admin.site.register(Gaps)
admin.site.register(GapImage)

#managing images in the Gaps 
class GapImageInline(admin.TabularInline):
    model = Gaps.images.through
    extra = 1 

class Gaps(admin.ModelAdmin):
    inlines = [GapImageInline]
    list_display = ('title', 'description', 'image','site_preparation', 'planting', 'fertilizer_application')

 
    fieldsets = (
        (None, {
            'fields': ('title', 'description')
        }),
        ('Agronomic Practices', {
            'fields': ('site_preparation', 'planting', 'fertilizer_application', 'pest_and_disease_control', 'harvesting', 'yield_information')
        }),
        ('Images', {
            'fields': ('images',)
        }),
    )

