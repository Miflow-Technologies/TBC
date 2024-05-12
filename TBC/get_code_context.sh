#!/bin/bash

# This script extracts code context for React Native projects.

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of directories to look for (common React Native structure)
directories=("components" "screens" "navigation" "utils" "hooks" "constants" "services" "api" "styles" "app" "context" "config")

# List of file types to ignore (similar to Next.js)
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg")

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*
  do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      should_ignore=false
      for ignore_pattern in "${ignore_files[@]}"; do
        if [[ "$entry" == $ignore_pattern ]]; then
          should_ignore=true
          break
        fi
      done

      # If the file type should not be ignored, append its relative path and content to the output file
      if ! $should_ignore; then
        # Consider checking for specific React Native file extensions here (e.g. .js, .jsx, .ts, .tsx)
        if [[ "$entry" == *.{js,jsx,ts,tsx} ]]; then
          relative_path=${entry#"$project_dir/"}
          echo "// File: $relative_path" >> "$output_file"
          cat "$entry" >> "$output_file"
          echo "" >> "$output_file"
        fi
      fi
    fi
  done
}

# Call the recursive function for each specified directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    read_files "${project_dir}/${dir}"
  fi
done

echo "Code context written to: $output_file"
