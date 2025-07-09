from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, payslip_view, download_payslip_pdf
from rest_framework.authtoken.views import obtain_auth_token  # 👈 Add this

router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),  # /api/employees/
    path('payslip/<int:pk>/', payslip_view, name='payslip_view'),
    path('payslip/<int:pk>/pdf/', download_payslip_pdf, name='download_payslip_pdf'),

    path('token/', obtain_auth_token),  # 👈 Login endpoint: /api/token/
]
