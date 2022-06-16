from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress


class ProductSerialiser(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ShippingAddressSerialiser(ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerialiser(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerialiser(ModelSerializer):
    orderItems = SerializerMethodField(read_only=True)
    shippingAddress = SerializerMethodField(read_only=True)
    user = SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serialiser = OrderItemSerialiser(items, many=True)
        return serialiser.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerialiser(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serialiser = UserSerialiser(user, many=False)
        return serialiser.data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serialiser = UserSerialiserWithToken(self.user).data

        for k, v in serialiser.items():
            data[k] = v
        return data


class UserSerialiser(ModelSerializer):
    _id = SerializerMethodField(read_only=True)
    isAdmin = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerialiserWithToken(UserSerialiser):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin', 'token']

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)

        return str(refresh.access_token)
