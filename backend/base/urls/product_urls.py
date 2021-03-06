from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('top/', views.getTopProducts, name="top-products"),
    path('<str:id>/reviews/', views.createProductReview, name="create-review"),
    path('<str:id>/', views.getProduct, name="product"),

    path('delete/<str:id>/', views.deleteProduct, name="product-delete"),
    path('update/<str:id>/', views.updateProduct, name="product-update"),
]
