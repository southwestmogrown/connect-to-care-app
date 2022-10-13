from enum import unique
from xmlrpc.client import Boolean
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password
        """
        if not email:
            raise ValueError("Please enter an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        
        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    is_seeker = models.BooleanField(default=False)
    is_administrator = models.BooleanField(default=False)
    has_credentials = models.BooleanField(default=False)
    email = models.EmailField("email address", unique=True)

    def __str__(self):
        return self.username

    def get_id(self):
        return self.id

    def get_self(self):
        return self
        
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

class Administrator(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    position = models.CharField('Position', max_length=50, null=False, blank=False)
    title = models.CharField('Title', max_length=50, null=False, blank=False)
    full_name = models.CharField('Full Name', max_length=100, null=False, blank=False)
    address = models.CharField('Address', max_length=255, null=False, blank=False)
    phone_number = PhoneNumberField(null=False, blank=False, unique=True)
    facility_enrolled = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name

