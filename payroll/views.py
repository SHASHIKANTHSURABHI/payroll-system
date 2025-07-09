from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view

from .models import Employee
from .serializers import EmployeeSerializer

# 1. API ViewSet for frontend (React)
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# 2. Index view for React frontend routing
class IndexView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')

# 3. Payslip HTML View
def payslip_view(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    net_salary = employee.basic_salary + employee.allowance - employee.deductions
    return render(request, 'payslip.html', {
        'employee': employee,
        'net_salary': net_salary
    })

# 4. PDF Download View
def download_payslip_pdf(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    net_salary = employee.basic_salary + employee.allowance - employee.deductions

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="payslip_{employee.name}.pdf"'

    p = canvas.Canvas(response)
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 800, f"Payslip for {employee.name}")

    p.setFont("Helvetica", 12)
    p.drawString(100, 760, f"Role: {employee.role}")
    p.drawString(100, 740, f"Basic Salary: ₹{employee.basic_salary}")
    p.drawString(100, 720, f"Allowance: ₹{employee.allowance}")
    p.drawString(100, 700, f"Deductions: ₹{employee.deductions}")
    p.drawString(100, 680, f"Net Salary: ₹{net_salary}")

    p.showPage()
    p.save()
    return response

# 5. ✅ CSRF-exempt Custom Auth Token View for React Login
class CustomAuthToken(APIView):
    authentication_classes = [BasicAuthentication]  # ⛔ No SessionAuthentication
    permission_classes = [AllowAny]  # ⛔ Allow public access

    def post(self, request, *args, **kwargs):
        from rest_framework.authtoken.serializers import AuthTokenSerializer
        serializer = AuthTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username
        })
