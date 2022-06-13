from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

from base.serialiser import MyTokenObtainPairSerializer, UserSerialiser, UserSerialiserWithToken

from django.contrib.auth.models import User


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serialiser = UserSerialiserWithToken(user, many=False)

        return Response(serialiser.data)

    except:
        message = {'detail': "User with this email already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serialiser = UserSerialiser(user, many=False)
    return Response(serialiser.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serialiser = UserSerialiser(users, many=True)
    return Response(serialiser.data)