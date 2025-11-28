#!/bin/bash

# Script to convert PNG, JPG, JPEG images to WebP format
# Recursively processes all subdirectories in /public/images

INPUT_DIR="./public/images"
QUALITY=80

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed."
    echo "Install it with: brew install webp (macOS) or apt-get install webp (Linux)"
    exit 1
fi

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: Directory $INPUT_DIR does not exist."
    exit 1
fi

echo "Starting WebP conversion in $INPUT_DIR and subdirectories..."
echo ""

# Counter for converted files
converted=0
skipped=0
deleted=0

# Find all PNG, JPG, JPEG files recursively
while IFS= read -r img; do
    # Get directory and filename without extension
    dir=$(dirname "$img")
    filename=$(basename "$img")
    name_without_ext="${filename%.*}"
    webp_output="$dir/$name_without_ext.webp"
    
    # Skip if WebP already exists
    if [ -f "$webp_output" ]; then
        echo "⏭️  Skipped: $img (WebP already exists)"
        skipped=$((skipped + 1))
        continue
    fi
    
    # Convert to WebP
    if cwebp -q "$QUALITY" "$img" -o "$webp_output" &> /dev/null; then
        # Verify WebP file was created successfully
        if [ -f "$webp_output" ]; then
            echo "✅ Converted: $img → $webp_output"
            converted=$((converted + 1))
            
            # Delete original image after successful conversion
            if rm "$img"; then
                echo "🗑️  Deleted: $img"
                deleted=$((deleted + 1))
            else
                echo "⚠️  Warning: Failed to delete original file: $img"
            fi
        else
            echo "❌ Failed: WebP file was not created for $img"
        fi
    else
        echo "❌ Failed: $img"
    fi
done < <(find "$INPUT_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \))

echo ""
echo "Conversion complete!"
echo "  Converted: $converted files"
echo "  Deleted: $deleted files"
echo "  Skipped: $skipped files"
