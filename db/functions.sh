#!/usr/bin/env bash
set -e

(
  cd db

  NAME=${1:-update_functions}

  VIEWS_DIR="sql/functions"
  MIGRATIONS_DIR="supabase/migrations"

  echo "Creating migration..."

  supabase migration new "$NAME"

  MIGRATION_FILE=$(ls -t $MIGRATIONS_DIR/*.sql | head -n 1)

  echo "Writing views into $MIGRATION_FILE"

  > "$MIGRATION_FILE"

  for file in $VIEWS_DIR/*.sql
  do
    echo "-- $(basename "$file")" >> "$MIGRATION_FILE"
    cat "$file" >> "$MIGRATION_FILE"
    echo -e "\n" >> "$MIGRATION_FILE"
  done

  echo "Running migration..."
  if ! supabase db push --yes; then      
    rm $MIGRATION_FILE
  fi
  echo "Done."
)
