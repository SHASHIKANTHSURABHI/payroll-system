from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, payslip_view, download_payslip_pdf, IndexView, CustomAuthToken

router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/payslip/<int:pk>/', payslip_view, name='payslip_view'),
    path('api/payslip/<int:pk>/pdf/', download_payslip_pdf, name='download_payslip_pdf'),
    path('api/token/', CustomAuthToken.as_view()),  # ✅ Your custom login view

    # React frontend catch-all (not for API)
    re_path(r'^(?!api/).*$', IndexView.as_view(), name='index'),
]
