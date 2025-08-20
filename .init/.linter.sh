#!/bin/bash
cd /home/kavia/workspace/code-generation/hostel-management-system-8824/frontend_webapp
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

