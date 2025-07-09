from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    basic_salary = models.IntegerField()
    allowance = models.IntegerField()
    deductions = models.IntegerField()
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    @property
    def net_salary(self):
        return self.basic_salary + self.allowance - self.deductions

    def __str__(self):
        return self.name
