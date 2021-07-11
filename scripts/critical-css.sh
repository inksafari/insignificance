#!/bin/bash
mkdir -p ./.tmp/

for f in build/*.html build/**/*.html
do
  echo "Inlining critical css of $f"
  mkdir -p $(dirname ./.tmp/$f)
  critical "$f" --base build/ --inline > ./.tmp/$f
  mv ./.tmp/$f $f
done

rm -r ./.tmp