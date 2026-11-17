from django.shortcuts import render
from django.http import HttpResponse ,request
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
def home(request):
    return HttpResponse("Welcome to the E-commerce Home Page!")
    
@api_view(['GET'])
def Empinfo(request):
    datas = [
        {
            'id': 1,
            'empname': 'John Doe',
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
            'empname': ' Doe',
            'emprole': 'Software Engineer',
            'empsalary': 50000
        },
           {
            'id': 6,
            'empname': 'Thal',
            'emprole': ' Engineer',
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
            'empname': 'John ',
            'emprole': 'Software Engineer',
            'empsalary': 50000
        },
           {
            'id': 9,
            'empname': ' Smith',
            'emprole': 'Product Manager',
            'empsalary': 60000
        },
           {
            'id': 10,
            'empname': 'Bob ',
            'emprole': 'Data Analyst',
            'empsalary': 55000
        }
     
    ]
    return Response(datas)