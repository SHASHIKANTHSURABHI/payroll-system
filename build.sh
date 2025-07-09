#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -o errexit

# Step 1: Install backend dependencies
pip install -r requirements.txt

# Step 2: Install and build React frontend
cd payroll/frontend
npm install
npm run build
cd ../../  # Go back to root project directory

# Step 3: Run Django migrations
python manage.py migrate

# Step 4: Collect static files
python manage.py collectstatic --noinput
