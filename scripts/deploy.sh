#!/bin/bash

# 빌드
yarn build

# 기존 docs 폴더 삭제
rm -rf docs

# dist 폴더를 docs 폴더로 이동
mv dist docs

# 변경 사항 커밋 및 푸시
git add .
git commit -m "Deploy to GitHub Pages"
git push origin master