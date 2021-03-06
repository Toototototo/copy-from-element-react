#!/bin/bash

# testing before publish
npm run lint && npm run build

if [ $? = 0 ]; then
  # purge dist
  rm -fr dist

  export BABEL_ENV=production

  # babel transform es6 into es5
  babel src --out-dir es/src --copy-files
  babel libs --out-dir es/libs --copy-files
  babel build/npm/index.js --out-file es/index.js

  babel src --out-dir dist/npm/es6/src --copy-files
  babel libs --out-dir dist/npm/es6/libs --copy-files

  # keep es6 for next.js
  cp build/npm/next.js next.js
else
  echo 'Code cant be verify, plz check ~'
fi
