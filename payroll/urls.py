from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import (
    EmployeeViewSet,
    payslip_view,
    download_payslip_pdf,
    IndexView,  # ✅ Correctly imported once
)
from .views import custom_auth_token  

router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/payslip/<int:pk>/', payslip_view, name='payslip_view'),
    path('api/payslip/<int:pk>/pdf/', download_payslip_pdf, name='download_payslip_pdf'),

    path('api/token/', custom_auth_token),  # ✅ Your custom login view

    # ✅ Catch-all route for React frontend — ignores any /api/ paths
    re_path(r'^(?!api/).*$', IndexView.as_view(), name='index'),
]
