from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('uiu_id', 'username', 'email', 'password', 'password2',
                  'first_name', 'last_name', 'role', 'phone', 'date_of_birth',
                  'blood_group', 'address', 'emergency_contact')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'uiu_id', 'username', 'email', 'first_name', 'last_name',
                  'role', 'phone', 'date_of_birth', 'blood_group', 'address',
                  'emergency_contact', 'created_at')
        read_only_fields = ('id', 'created_at')
