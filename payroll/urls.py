from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, payslip_view, download_payslip_pdf
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('payslip/<int:pk>/', payslip_view, name='payslip_view'),
    path('payslip/<int:pk>/pdf/', download_payslip_pdf, name='download_payslip_pdf'),

    # ✅ JWT Auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
