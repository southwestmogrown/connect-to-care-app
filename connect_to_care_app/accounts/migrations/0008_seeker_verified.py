# Generated by Django 4.1.2 on 2022-10-14 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_seeker_has_been_disqualified_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='seeker',
            name='verified',
            field=models.BooleanField(default=False, verbose_name='Verified'),
        ),
    ]
