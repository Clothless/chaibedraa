#!/bin/bash
set -e

DB_NAME="chaibedraa"

# Connect to postgres database to create our database if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE $DB_NAME;
EOSQL

# Connect to our database and apply migrations
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f /app/backend/migrations/000001_create_database.up.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f /app/backend/migrations/000002_create_contact_messages.up.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f /app/backend/migrations/000003_create_dashboard_tables.up.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f /app/backend/migrations/000004_add_admin_user.up.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" -f /app/backend/migrations/000005_create_blog_posts_table.up.sql 