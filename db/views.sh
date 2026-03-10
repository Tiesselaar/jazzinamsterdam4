#!/usr/bin/env bash
set -e

(
  cd db

  NAME=${1:-update_views}

  VIEWS_DIR="sql/views"
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
  else  
    echo "Updating types..."
    source .env
    supabase gen types typescript --project-id $SUPABASE_PROJECT_ID --schema public > $SUPABASE_TYPES
  fi
  echo "Done."
)
