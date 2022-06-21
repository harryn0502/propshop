from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name="orders"),
    path('add/', views.addOrderItems, name="orders-add"),
    path('myorders/', views.getMyOrders, name="myorders"),

    path('<str:id>/', views.getOrderById, name="user-order"),
    path('<str:id>/deliver/', views.updateOrderToDeliver, name="deliver"),
    path('<str:id>/pay/', views.updateOrderToPay, name="paid"),

]
