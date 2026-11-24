
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import Register

# class RegisterSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(max_length=50)
#     fullname = serializers.CharField(max_length=100)
#     email = serializers.EmailField(max_length=100)
#     password = serializers.CharField(max_length=100, write_only=True)
#     confirmPassword = serializers.CharField(max_length=100, write_only=True)
#     mobile = serializers.CharField(max_length=15)
#         def create(self, validated_data):
#             return Register.objects.create_user(**validated_data)



class RegisterSerializer(serializers.ModelSerializer):

    confirmPassword = serializers.CharField(
        write_only=True,
        required=False
    )
    password = serializers.CharField(write_only=True)

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
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError(
                {"confirmPassword": "Password does not match"}
            )

        return data

    def create(self, validated_data):

        validated_data.pop('confirmPassword', None)

        validated_data['password'] = make_password(
            validated_data['password']
        )

        return Register.objects.create(**validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('confirmPassword', None)

        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)

        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()
        return instance



class Registeruserdata(serializers.ModelSerializer):
      class Meta:
            model = Register
            fields = [
                'id',
                'username',
                'fullname',
                'email',
                'mobile',
                'created_at'
            ]
