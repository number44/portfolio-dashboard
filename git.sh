#! /usr/bin/bash
read -p "Enter commit messagge : " MSG
git add .
git commit -m "$MSG"
git push origin main 
