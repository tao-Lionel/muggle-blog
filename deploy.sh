#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# npm run build 
npm run docs:build
cd docs/.vuepress/dist

# 部署
if [ -z "$GITHUB_TOKEN"]; then
  msg='deploy'
  githubUrl=git@github.com:tao-Lionel/tao-Lionel.github.io.git
else
  msg="来自github action的自动部署"
  githubUrl=https://tao-Lionel:${GITHUB_TOKEN}@github.com/tao-Lionel/tao-Lionel.github.io.git/
  git config --global user.name 'wangtao'
  git config --global user.email 'lionel_tao@163.com'
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:master # 推送到github

# push_addr=git@github.com:tao-Lionel/tao-Lionel.github.io.git # git提交地址，也可以手动设置，比如：push_addr=git@github.com:xugaoyi/vuepress-theme-vdoing.git
# commit_info=`git describe --all --always --long`
# dist_path=docs/.vuepress/dist # 打包生成的文件夹路径
# push_branch=master # 推送的分支

# # 生成静态文件
# npm run build

# # 进入生成的文件夹
# cd $dist_path

# git init
# git add -A
# # git commit -m "deploy, $commit_info"
# git commit -m "deploy"
# # git push -f $push_addr HEAD:$push_branch
# git push -f git@github.com:tao-Lionel/tao-Lionel.github.io.git master

# cd -
# rm -rf $dist_path
