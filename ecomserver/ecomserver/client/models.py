
from django.db import models


class Register(models.Model):

    username = models.CharField(
        max_length=50,
        unique=True
    )

    fullname = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        unique=True
    )

    password = models.CharField(
        max_length=128
    )

    mobile = models.CharField(
        max_length=10,
        unique=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.username
