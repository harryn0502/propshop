from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from base.serialiser import ProductSerialiser
from base.models import Product, Review
from base.products import products
import os
from django.conf import settings
from django.conf.urls.static import static


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
    if product.image != '/sample.jpg':
        os.remove(
            str(settings.STATICFILES_DIRS[0])+'/images/'+str(product.image))

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, id):
    user = request.user
    product = Product.objects.get(_id=id)
    data = request.data

    # 1 - Review already exists
    doesExist = product.review_set.filter(user=user).exists()

    if doesExist:
        content = {'detail': "Product already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 2 - No rating or 0
    elif data['rating'] == 0:
        content = {'detail': "Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3 - Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.username,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for each in reviews:
            total += each.rating
        product.rating = total/len(reviews)
        product.save()

    return Response("Review Added")
