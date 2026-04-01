#!/bin/bash

# Script to convert MOV, MP4, AVI, MKV videos to optimized WebM (VP9) format
# Recursively processes all subdirectories in /public/videos

INPUT_DIR="./public/videos"
CRF=35
MAX_BITRATE="1M"

if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed."
    echo "Install it with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
    exit 1
fi

if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Directory $INPUT_DIR does not exist."
    exit 1
fi

echo "Starting WebM conversion in $INPUT_DIR and subdirectories..."
echo "  Codec: VP9 | CRF: $CRF | Max bitrate: $MAX_BITRATE"
echo ""

converted=0
skipped=0
deleted=0

while IFS= read -r video; do
    dir=$(dirname "$video")
    filename=$(basename "$video")
    name_without_ext="${filename%.*}"
    webm_output="$dir/$name_without_ext.webm"

    if [ -f "$webm_output" ]; then
        echo "⏭️  Skipped: $video (WebM already exists)"
        skipped=$((skipped + 1))
        continue
    fi

    original_size=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
    echo "🔄 Converting: $video ..."

    # Two-pass VP9 encoding for best quality/size ratio
    ffmpeg -i "$video" \
        -c:v libvpx-vp9 \
        -crf "$CRF" -b:v "$MAX_BITRATE" \
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
        -an \
        -auto-alt-ref 1 -lag-in-frames 25 \
        -row-mt 1 \
        -pass 1 -f null /dev/null -y 2>/dev/null \
    && ffmpeg -i "$video" \
        -c:v libvpx-vp9 \
        -crf "$CRF" -b:v "$MAX_BITRATE" \
        -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
        -an \
        -auto-alt-ref 1 -lag-in-frames 25 \
        -row-mt 1 \
        -pass 2 "$webm_output" -y 2>/dev/null

    if [ -f "$webm_output" ]; then
        new_size=$(stat -f%z "$webm_output" 2>/dev/null || stat -c%s "$webm_output" 2>/dev/null)
        ratio=$(awk "BEGIN {printf \"%.0f\", (1 - $new_size/$original_size) * 100}")
        echo "✅ Converted: $video → $webm_output (${ratio}% smaller)"
        converted=$((converted + 1))

        if rm "$video"; then
            echo "🗑️  Deleted: $video"
            deleted=$((deleted + 1))
        else
            echo "⚠️  Warning: Failed to delete original file: $video"
        fi
    else
        echo "❌ Failed: $video"
    fi
done < <(find "$INPUT_DIR" -type f \( -iname "*.mov" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mkv" \))

# Clean up ffmpeg pass log files
rm -f ffmpeg2pass-0.log 2>/dev/null

echo ""
echo "Conversion complete!"
echo "  Converted: $converted files"
echo "  Deleted: $deleted files"
echo "  Skipped: $skipped files"
