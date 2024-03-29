# Generated by Django 4.1.7 on 2023-04-14 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DesignFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=70)),
                ('fileID', models.CharField(default='', max_length=30, unique=True)),
                ('modifiedDate', models.CharField(default='', max_length=150)),
                ('createDate', models.CharField(default='', max_length=150)),
                ('width', models.IntegerField(default=168)),
                ('height', models.IntegerField(default=144)),
                ('roomLock', models.BooleanField(default=False)),
                ('designMode', models.CharField(choices=[('room', 'room'), ('furnish', 'furnish')], default='room', max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='RoomObject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fileID', models.CharField(max_length=30)),
                ('itemKey', models.IntegerField()),
                ('url', models.CharField(max_length=500)),
                ('defaultWidth', models.FloatField()),
                ('defaultHeight', models.FloatField()),
                ('description', models.CharField(max_length=500)),
                ('category', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('uid', models.CharField(max_length=30, unique=True)),
                ('z', models.IntegerField()),
                ('width', models.FloatField()),
                ('height', models.FloatField()),
                ('rotate', models.FloatField()),
                ('x', models.FloatField()),
                ('y', models.FloatField()),
            ],
        ),
    ]
