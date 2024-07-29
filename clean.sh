#!/bin/bash

CYAN="\033[36m"
GREEN="\033[32m"
RESET="\033[0m"

echo -e "${CYAN}Finding build files to clean...${RESET}"

# List all directories and files in the src directory (non-recursive)
entries=()
while IFS= read -r -d $'\0' entry; do
  # Exclude the src directory itself
  if [[ "$entry" != "src" && "$entry" != "src/" ]]; then
    entries+=("$entry")
  fi
done < <(find src -maxdepth 1 \( -type d -o -type f \) -print0)

for entry in "${entries[@]}"; do
  echo "$entry"
done

echo -e "${CYAN}Cleaning build files...${RESET}"

# Delete corresponding directories and files in the root directory
for entry in "${entries[@]}"; do
  name=$(basename "$entry")
  if [[ -d "$name" ]]; then
    echo "Deleting directory: $name"
    rm -rf "$name"
  elif [[ -f "$name" ]]; then
    echo "Deleting file: $name"
    rm -f "$name"
  fi
done

additional_files=("index.js" "index.d.ts")

for file in "${additional_files[@]}"; do
  if [[ -f "$file" ]]; then
    echo "Deleting file: $file"
    rm -f "$file"
  fi
done

echo -e "${GREEN}Deleted all build artifacts!${RESET}"
