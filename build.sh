#!/usr/bin/env bash

# Install Python packages
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Collect React static files into Django static dir
python manage.py collectstatic --noinput
