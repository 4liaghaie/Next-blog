from django.core.exceptions import ValidationError

def validate_jpeg(image):
    if not image.name.lower().endswith('.jpg') and not image.name.lower().endswith('.jpeg'):
        raise ValidationError('Only JPEG images are allowed.')
