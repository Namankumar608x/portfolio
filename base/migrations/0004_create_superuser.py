from django.db import migrations
import os

def create_superuser(apps, schema_editor):
    User = apps.get_model("auth", "User")

    username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
    password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

    # If env vars are not set, do nothing (safe)
    if not username or not password:
        return

    # Create superuser only if it doesn't exist
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )

class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_contactmessage"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]
