#!/bin/bash

echo "Starting Downloads..."
cat requirements.txt | xargs npm install
echo "Dependencies downloaded."
echo "Starting web server..."
npm start
echo "Server started."