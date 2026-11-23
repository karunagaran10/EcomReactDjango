
from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import RegisterSerializer


# Home Page
def home(request):
    return HttpResponse("Welcome to the E-commerce Home Page!")


# Employee Information API
@api_view(['GET'])
def Empinfo(request):

    datas = [
        {
            'id': 1,
            'empname': 'thiru',
            'emprole': 'Software Engineer',
            'empsalary': 50000
        },
        {
            'id': 2,
            'empname': 'Jane Smith',
            'emprole': 'Product Manager',
            'empsalary': 60000
        },
        {
            'id': 3,
            'empname': 'Bob Johnson',
            'emprole': 'Data Analyst',
            'empsalary': 55000
        },
        {
            'id': 4,
            'empname': 'Alice Brown',
            'emprole': 'UX Designer',
            'empsalary': 55000
        },
        {
            'id': 5,
            'empname': 'Doe',
            'emprole': 'Software Engineer',
            'empsalary': 50000
        },
        {
            'id': 6,
            'empname': 'Thal',
            'emprole': 'Engineer',
            'empsalary': 50000
        },
        {
            'id': 7,
            'empname': 'Kalai',
            'emprole': 'Data science',
            'empsalary': 50000
        },
        {
            'id': 8,
            'empname': 'John',
            'emprole': 'Software Engineer',
            'empsalary': 50000
        },
        {
            'id': 9,
            'empname': 'Smith',
            'emprole': 'Product Manager',
            'empsalary': 60000
        },
        {
            'id': 10,
            'empname': 'Bob',
            'emprole': 'Data Analyst',
            'empsalary': 55000
        }
    ]

    return Response(datas)



@api_view(['POST'])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.save()

        return Response({
            "message": "Registration Successful!",
            "unique_id": f"USER-{user.id:04d}"
        }, status=status.HTTP_201_CREATED)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
