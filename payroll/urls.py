from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, payslip_view, download_payslip_pdf, IndexView
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # e.g. /api/employees/
    path('api/payslip/<int:pk>/', payslip_view, name='payslip_view'),
    path('api/payslip/<int:pk>/pdf/', download_payslip_pdf, name='download_payslip_pdf'),
    path('api/token/', obtain_auth_token),  # login endpoint

    # ✅ Catch-all path for React frontend routing (must be last)
    re_path(r'^.*$', IndexView.as_view(), name='index'),
]
