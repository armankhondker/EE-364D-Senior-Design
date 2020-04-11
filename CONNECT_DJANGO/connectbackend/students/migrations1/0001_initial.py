# Generated by Django 2.2.6 on 2020-04-10 21:04

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('eid', models.CharField(max_length=20)),
                ('phone', models.CharField(max_length=12)),
                ('email', models.EmailField(max_length=100)),
                ('linkedIn', models.CharField(blank=True, max_length=100)),
                ('resume_link', models.URLField(blank=True, max_length=100)),
                ('intentions', djongo.models.fields.DictField(default={})),
                ('interests', djongo.models.fields.DictField(default={})),
                ('time_commitment', models.CharField(max_length=100)),
                ('logistics', djongo.models.fields.DictField(default={})),
                ('degree', models.CharField(max_length=100)),
                ('tech_courses', djongo.models.fields.DictField(default={})),
                ('prof_courses', djongo.models.fields.DictField(default={})),
                ('experience', djongo.models.fields.DictField(default={})),
                ('tech_skills', djongo.models.fields.DictField(default={})),
                ('prof_skills', djongo.models.fields.DictField(default={})),
                ('other_skills', models.TextField(blank=True, max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]