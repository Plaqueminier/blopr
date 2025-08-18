#!/bin/bash
# Quick SQLite query helper for Blopr database

DB_PATH="/var/www/blopr/backend/blopr.db"

case "$1" in
    "all")
        sqlite3 "$DB_PATH" "SELECT id, date, time, systolic, diastolic, heart_rate FROM blood_pressure_entries ORDER BY created_at DESC;"
        ;;
    "count")
        sqlite3 "$DB_PATH" "SELECT COUNT(*) as total_entries FROM blood_pressure_entries;"
        ;;
    "recent")
        sqlite3 "$DB_PATH" "SELECT id, date, time, systolic, diastolic, heart_rate FROM blood_pressure_entries ORDER BY created_at DESC LIMIT 10;"
        ;;
    "schema")
        sqlite3 "$DB_PATH" ".schema blood_pressure_entries"
        ;;
    *)
        echo "Usage: $0 {all|count|recent|schema}"
        echo "  all    - Show all entries"
        echo "  count  - Count total entries"
        echo "  recent - Show last 10 entries"
        echo "  schema - Show table structure"
        ;;
esac