
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import Register


class RegisterSerializer(serializers.ModelSerializer):

    confirmPassword = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = Register

        fields = [
            'id',
            'username',
            'fullname',
            'email',
            'password',
            'confirmPassword',
            'mobile'
        ]

    def validate(self, data):

        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError(
                {"confirmPassword": "Password does not match"}
            )

        return data

    def create(self, validated_data):

        validated_data.pop('confirmPassword')

        validated_data['password'] = make_password(
            validated_data['password']
        )

        return Register.objects.create(**validated_data)
