from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from base.serialiser import ProductSerialiser
from base.models import Product
from base.products import products

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