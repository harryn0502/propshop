from itertools import product
from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.serialiser import ProductSerialiser

from .models import Product
from .products import products

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response({'message':"Hello World"})

@api_view(['GET'])
def getProducts(request):
  products = Product.objects.all()
  serialiser = ProductSerialiser(products, many=True)
  return Response(serialiser.data)

@api_view(['GET'])
def getProduct(request, id):
  product = Product.objects.get(_id=id)
  serialiser = ProductSerialiser(product, many=False)

  return Response(serialiser.data)