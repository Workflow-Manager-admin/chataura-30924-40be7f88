#!/bin/bash
cd /home/kavia/workspace/code-generation/chataura-30924-40be7f88/chat_aura
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

