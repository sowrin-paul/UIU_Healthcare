from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('uiu_id', 'username', 'email', 'role',
                    'first_name', 'last_name', 'is_active')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('uiu_id', 'username', 'email', 'first_name', 'last_name')
    ordering = ('-created_at',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('UIU Information', {
            'fields': ('uiu_id', 'role', 'phone', 'date_of_birth', 'blood_group',
                       'address', 'emergency_contact')
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('UIU Information', {
            'fields': ('uiu_id', 'role', 'phone', 'date_of_birth', 'blood_group',
                       'address', 'emergency_contact')
        }),
    )
