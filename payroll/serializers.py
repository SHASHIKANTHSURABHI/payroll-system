from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    net_salary = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'name', 'role', 'basic_salary', 'allowance', 'deductions', 'tax_rate','net_salary']

    def get_net_salary(self, obj):
        gross = obj.basic_salary + obj.allowance
        tax = gross * (obj.tax_rate / 100)
        return gross - obj.deductions - tax