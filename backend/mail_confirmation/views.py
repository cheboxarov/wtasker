from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .tasks import confirmation_email
from rest_framework.permissions import IsAuthenticated
from .models import ConfirmationTask
from time import time
from django.contrib.auth import get_user_model

class MailConfirmationView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        params = request.query_params
        uidb64 = params.get("uidb64")
        token = params.get("token")
        if not uidb64 or not token:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        task_query = ConfirmationTask.objects.filter(user=user, uid=uidb64, token=token)
        if not task_query.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        data = request.data
        email = data.get("mail")
        if email is None:
            return Response({"error": "need email"}, status=status.HTTP_400_BAD_REQUEST)
        confirmation_email.delay(user)
        return Response({"result": True}, status=status.HTTP_200_OK)
