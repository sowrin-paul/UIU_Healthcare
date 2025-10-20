from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import RegisterSerializer, UserSerializer, AppointmentSerializer, BookAppointmentSerializer, UpdateAppointmentStatusSerializer
from .models import User, Appointment


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Registration successful! Please check your email for verification.'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        uiu_id = request.data.get('uiuId')
        password = request.data.get('password')

        if not uiu_id or not password:
            return Response({
                'error': 'Please provide both UIU ID and password'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(uiu_id=uiu_id)
            authenticated_user = authenticate(
                username=user.username,
                password=password
            )

            if authenticated_user is None:
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)

            user = authenticated_user

        except User.DoesNotExist:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'error': 'Account is deactivated'
            }, status=status.HTTP_403_FORBIDDEN)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({
                    'message': 'Logout successful'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'message': 'Logout successful'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message': 'Logout successful'
            }, status=status.HTTP_200_OK)


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class DoctorListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role='STAFF')


class AppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'date', 'emergency']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'STUDENT':
            return Appointment.objects.filter(patient=user)
        elif user.role == 'STAFF':
            return Appointment.objects.filter(doctor=user)
        else:  # admin
            return Appointment.objects.all()


class BookAppointmentView(generics.CreateAPIView):
    serializer_class = BookAppointmentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        appointment = serializer.save()

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_201_CREATED
        )


class AppointmentDetailView(generics.RetrieveAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'STUDENT':
            return Appointment.objects.filter(patient=user)
        elif user.role == 'STAFF':
            return Appointment.objects.filter(doctor=user)
        else:
            return Appointment.objects.all()


class UpdateAppointmentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)

            # Check permissions
            user = request.user
            if user.role == 'STUDENT' and appointment.patient != user:
                return Response(
                    {'error': 'You do not have permission to update this appointment'},
                    status=status.HTTP_403_FORBIDDEN
                )
            elif user.role == 'STAFF' and appointment.doctor != user:
                return Response(
                    {'error': 'You do not have permission to update this appointment'},
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = UpdateAppointmentStatusSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            appointment.status = serializer.validated_data['status']
            appointment.save()

            return Response(
                AppointmentSerializer(appointment).data,
                status=status.HTTP_200_OK
            )
        except Appointment.DoesNotExist:
            return Response(
                {'error': 'Appointment not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class CancelAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)

            # Only patient can cancel
            if request.user != appointment.patient:
                return Response(
                    {'error': 'Only the patient can cancel this appointment'},
                    status=status.HTTP_403_FORBIDDEN
                )

            appointment.status = 'cancelled'
            appointment.save()

            return Response(
                AppointmentSerializer(appointment).data,
                status=status.HTTP_200_OK
            )
        except Appointment.DoesNotExist:
            return Response(
                {'error': 'Appointment not found'},
                status=status.HTTP_404_NOT_FOUND
            )
