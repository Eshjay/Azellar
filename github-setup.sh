#!/bin/bash

# GitHub Setup Commands
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub details

echo "Setting up GitHub repository..."

# Add the GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Set the main branch
git branch -M main

# Push all your code to GitHub
git push -u origin main

echo "Setup complete! Your code should now be on GitHub."