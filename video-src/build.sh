#!/bin/bash
# Records are in out/*.webm; this trims the blank start, encodes web mp4 and a poster into each landing folder
set -euo pipefail
cd "$(dirname "$0")"
for name in alarmlint flujolisto citaclara; do
  src="out/$name.webm"
  # Blank start can be black (dark scene) or white (light scene); check the original and the negated video
  start=0
  for vf in "blackdetect=d=0.1:pix_th=0.12" "negate,blackdetect=d=0.1:pix_th=0.12"; do
    line=$(ffmpeg -hide_banner -i "$src" -t 5 -vf "$vf" -an -f null - 2>&1 | grep -m1 'black_start:0 ' || true)
    end=$(echo "$line" | grep -o 'black_end:[0-9.]*' | cut -d: -f2 || true)
    if [ -n "$end" ]; then start=$end; fi
  done
  ffmpeg -v error -y -ss "$start" -i "$src" -vf "scale=1920:1080,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an "../$name/demo.mp4"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "../$name/demo.mp4")
  ffmpeg -v error -y -ss "$(echo "$dur * 0.55" | bc)" -i "../$name/demo.mp4" -frames:v 1 -vf scale=1280:-1 -q:v 4 "../$name/demo-poster.jpg"
  echo "$name trimmed=${start}s duration=${dur}s size=$(du -h "../$name/demo.mp4" | cut -f1)"
done
