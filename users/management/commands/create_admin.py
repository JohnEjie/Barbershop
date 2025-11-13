from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Create a default admin user if it doesn't exist"

    def handle(self, *args, **options):
        User = get_user_model()
        admin_username = "admin"
        admin_email = "admin@example.com"
        admin_password = "admin123"

        if not User.objects.filter(username=admin_username).exists():
            User.objects.create_superuser(
                username=admin_username,
                email=admin_email,
                password=admin_password
            )
            self.stdout.write(self.style.SUCCESS("✅ Admin user created successfully!"))
        else:
            self.stdout.write(self.style.WARNING("⚠️ Admin user already exists."))
