from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from base.serialiser import OrderSerialiser

from base.models import Product, Order, ShippingAddress, OrderItem


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No order Items'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        # Create Order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],

        )
        # Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        # Create Order Items and set order to orderItem relationship
        for each in orderItems:
            product = Product.objects.get(_id=each['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=each['qty'],
                price=each['price'],
                image=product.image.url,
            )
            # Update Stock
            product.countInStock -= item.quantity
            product.save()

        serialiser = OrderSerialiser(order, many=False)
        return Response(serialiser.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serialiser = OrderSerialiser(orders, many=True)

    return Response(serialiser.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serialiser = OrderSerialiser(orders, many=True)

    return Response(serialiser.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, id):
    user = request.user

    try:
        order = Order.objects.get(_id=id)
        if user.is_staff or order.user == user:
            serialiser = OrderSerialiser(order, many=False)
            return Response(serialiser.data)
        else:
            return Response({'detail': 'Not autorised to view this order'},
                            status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'},
                        status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPay(request, id):
    order = Order.objects.get(_id=id)

    order.isPaid = True
    order.paidAt = timezone.now()
    order.save()
    return Response("Paid")

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDeliver(request, id):
    order = Order.objects.get(_id=id)

    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()
    return Response("Delivered")