"""
URL configuration for wtasker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from task.urls import router as task_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from registration.views import RegisterView
from mail_confirmation.urls import urlpatterns as mail_confirmation_urls
from users.urls import urlpatterns as users_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include([
        path('', include(task_router.urls)),
        path('', include(mail_confirmation_urls)),
        path('', include(users_urls)),
        path('register/', RegisterView.as_view(), name="registration"),
        path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
        path('token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    ]))
]