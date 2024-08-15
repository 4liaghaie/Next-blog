from rest_framework import viewsets
from .models import Post
from .serializers import BlogPostSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = BlogPostSerializer
