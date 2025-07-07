#!/bin/bash

# Map of flat notes to sharp equivalents
declare -A FLAT_TO_SHARP=(
  ["Ab"]="G#"
  ["Bb"]="A#"
  ["Cb"]="B"
  ["Db"]="C#"
  ["Eb"]="D#"
  ["Fb"]="E"
  ["Gb"]="F#"
)

# Loop through all files with .mp3 extension
for file in *.mp3; do
  for flat in "${!FLAT_TO_SHARP[@]}"; do
    if [[ "$file" == *"$flat"* ]]; then
      sharp=${FLAT_TO_SHARP[$flat]}
      newfile="${file//$flat/$sharp}"
      echo "Renaming '$file' -> '$newfile'"
      mv "$file" "$newfile"
    fi
  done
done
