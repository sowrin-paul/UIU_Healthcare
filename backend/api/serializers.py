from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
<<<<<<< HEAD
from .models import User

=======
from .models import User, Appointment
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
<<<<<<< HEAD
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
=======
    confirmPassword = serializers.CharField(write_only=True, required=True)
    name = serializers.CharField(write_only=True, required=True)
    # Explicitly define this field
    uiu_id = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('uiu_id', 'name', 'email', 'password', 'confirmPassword',
                  'phone', 'role')
        extra_kwargs = {
            'email': {'required': True},
            'phone': {'required': False},
            'role': {'required': False},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPassword']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        if User.objects.filter(uiu_id=attrs['uiu_id']).exists():
            raise serializers.ValidationError(
                {"uiu_id": "This UIU ID is already registered."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirmPassword')

        # Split name into first_name and last_name
        full_name = validated_data.pop('name')
        name_parts = full_name.strip().split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        # Use uiu_id as username
        username = validated_data['uiu_id']

        # Determine role from UIU ID
        uiu_id = validated_data['uiu_id']
        if uiu_id.startswith('011'):
            role = 'STUDENT'
        elif uiu_id.startswith('STAFF') or uiu_id.startswith('DOC'):
            role = 'STAFF'
        elif uiu_id.startswith('ADMIN') or uiu_id == 'admin':
            role = 'ADMIN'
        else:
            role = 'STUDENT'

        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password'],
            uiu_id=validated_data['uiu_id'],
            first_name=first_name,
            last_name=last_name,
            phone=validated_data.get('phone', ''),
            role=role
        )

>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
        return user


class UserSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    class Meta:
        model = User
        fields = ('id', 'uiu_id', 'username', 'email', 'first_name', 'last_name',
                  'role', 'phone', 'date_of_birth', 'blood_group', 'address',
                  'emergency_contact', 'created_at')
        read_only_fields = ('id', 'created_at')
=======
    name = serializers.SerializerMethodField()
    uiuId = serializers.CharField(source='uiu_id', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'uiuId', 'name', 'email', 'role', 'phone',
                  'department', 'created_at')
        read_only_fields = ('id', 'created_at')

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['role'] = instance.role.lower()
        return data


class AppointmentSerializer(serializers.ModelSerializer):
    patient_id = serializers.CharField(source='patient.uiu_id', read_only=True)
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    doctor_id = serializers.CharField(source='doctor.uiu_id', read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)

    class Meta:
        model = Appointment
        fields = ('id', 'patient_id', 'patient_name', 'doctor_id', 'doctor_name',
                  'date', 'time', 'status', 'reason', 'emergency', 'notes',
                  'created_at', 'updated_at')
        read_only_fields = ('id', 'patient_id', 'patient_name', 'doctor_id',
                            'doctor_name', 'created_at', 'updated_at')


class BookAppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.CharField(write_only=True)

    class Meta:
        model = Appointment
        fields = ('doctor_id', 'date', 'time', 'reason', 'emergency')

    def validate_doctor_id(self, value):
        try:
            doctor = User.objects.get(uiu_id=value, role='staff')
            return doctor
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid doctor ID")

    def create(self, validated_data):
        doctor = validated_data.pop('doctor_id')
        validated_data['doctor'] = doctor
        validated_data['patient'] = self.context['request'].user
        return super().create(validated_data)


class UpdateAppointmentStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(
        choices=['pending', 'confirmed', 'completed', 'cancelled'])
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
