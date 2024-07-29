#!/bin/bash

# Build Next.js application
echo "Building Sahityotsav application..."
npm run build

# Start Next.js server
echo "Starting Main server..."
npm run start &

# Start Express server
echo "Starting Drive server..."
node drive/index.js
