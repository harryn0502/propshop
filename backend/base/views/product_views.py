from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    product = Product.objects.create(
        user=request.user,
        name="Sample Name",
        price=0,
        brand="Sample Brand",
        countInStock=0,
        category="Sample Category",
        description="",
    )
    serialiser = ProductSerialiser(product, many=False)

    return Response(serialiser.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, id):
    product = Product.objects.get(_id=id)
    product.delete()

    return Response("Product")


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, id):
    data = request.data
    product = Product.objects.get(_id=id)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serialiser = ProductSerialiser(product, many=False)

    return Response(serialiser.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']

    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')

    product.save()

    return Response("Image was uploaded")
