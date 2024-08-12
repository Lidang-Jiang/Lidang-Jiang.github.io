# 常用命令

# 如何将‘/mnt/data/two_stream/aliyun/4InceptionResnet_hdc_resnet_Attention’，这个文件夹下的所有文件同步到‘/mnt/workspace’下

# 请注意，源目录后面的斜杠/很重要，它表示同步该目录下的内容，而不是整个目录本身。

rsync -av /mnt/data/two_stream/single_node/   /mnt/workspace/

rsync -av   /mnt/workspace/      /mnt/data/two_stream/single_node/

# 同步代码到github

git add .

git commit -m "update"

git push origin master


# 强制推送（谨慎使用）
这将覆盖远程仓库的更改。只有当你确定没有人也在远程仓库上工作时，才应使用此选项。
git push origin master --force


# 使用git fetch 和 git reset（硬覆盖）

如果你想要完全覆盖本地的更改（警告：这将丢失所有本地更改），你可以使用以下命令：

git fetch origin

git reset --hard origin/master

# 创建一个仓库
git init
git config --global user.name "Lidang-Jiang"
git config --global user.email "lidangjiang@gmail.com"

git add .
git commit -m "update"
# 这里的地址是你的仓库地址
git remote add origin https://github.com/Lidang-Jiang/single_branch.git 
git push -u origin master


