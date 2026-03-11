#!/bin/bash
# Peptide Portal Demo Recorder
# Run this to record a demo video

echo "🎬 Peptide Portal Demo Recorder"
echo "================================"
echo ""
echo "This will record your screen with audio."
echo "Press Ctrl+C to stop recording."
echo ""
echo "Recording to: ~/Desktop/peptide-portal-demo.mp4"
echo ""
echo "Starting in 3 seconds..."
sleep 3

# Use ffmpeg to record screen (macOS)
# Note: You may need to grant screen recording permission in System Preferences

ffmpeg -f avfoundation -i "1:0" -t 300 \
  -c:v libx264 -preset fast -crf 23 \
  -c:a aac -b:a 128k \
  ~/Desktop/peptide-portal-demo.mp4

echo "✅ Recording saved to ~/Desktop/peptide-portal-demo.mp4"
