from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
<<<<<<< HEAD
from .views import RegisterView, LoginView, LogoutView, UserProfileView
=======
from .views import RegisterView, LoginView, LogoutView, UserProfileView, BookAppointmentView, AppointmentDetailView, UpdateAppointmentStatusView, CancelAppointmentView, DoctorListView, AppointmentListView
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
<<<<<<< HEAD
=======
    path('book/', BookAppointmentView.as_view(), name='book-appointment'),
    path('<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('<int:pk>/status/', UpdateAppointmentStatusView.as_view(), name='update-status'),
    path('<int:pk>/cancel/', CancelAppointmentView.as_view(), name='cancel-appointment'),
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('appointments/book/', BookAppointmentView.as_view(), name='book-appointment'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
    path('appointments/<int:pk>/status/', UpdateAppointmentStatusView.as_view(), name='update-status'),
    path('appointments/<int:pk>/cancel/', CancelAppointmentView.as_view(), name='cancel-appointment'),
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
]