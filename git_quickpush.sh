#!/bin/bash

if [ -z "$1" ]; then
  echo "❗ Commit-Nachricht fehlt."
  exit 1
fi

git add .
git commit -m "$1"
git push
