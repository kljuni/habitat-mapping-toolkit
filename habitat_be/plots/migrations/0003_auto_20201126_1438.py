# Generated by Django 3.1.3 on 2020-11-26 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plots', '0002_auto_20201126_1035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plot',
            name='region',
            field=models.CharField(max_length=50),
        ),
    ]
