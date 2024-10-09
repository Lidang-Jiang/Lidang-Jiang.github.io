# 常用命令


# 要打开 VSCode 的全局代码片段，您可以按照以下步骤操作：

打开命令面板：

在 Windows 或 Linux 上，按下 Ctrl + Shift + P。
在 macOS 上，按下 Cmd + Shift + P。
输入并选择“配置用户代码片段”：

在命令面板中输入 

Preferences: Configure User Snippets

从下拉列表中选择 “Preferences: Configure User Snippets” 选项。








# 同步代码到github

cd jupyterlab-try/

git add .

git commit -m "update"

git push origin main


# 强制推送（谨慎使用）
这将覆盖远程仓库的更改。只有当你确定没有人也在远程仓库上工作时，才应使用此选项。
git push origin main --force


# 使用git fetch 和 git reset（硬覆盖）

如果你想要完全覆盖本地的更改（警告：这将丢失所有本地更改），你可以使用以下命令：

git fetch origin

git reset --hard origin/main


# 使用 git reset --hard 回退到版本  git push --force 将本地的更改强制推送到了远程仓库。

下面是你所做的步骤总结：

git reset --hard 

回退到指定的提交：本地仓库的所有文件和状态已经成功回退到了提交 17dca80670ae2fa427f8b199b3855161488fe899 对应的状态。

git push --force 

强制推送：由于使用了 --force 选项，远程仓库的历史也被强制更新，现在远程仓库的状态和你本地的状态完全一致了，即回退到了 17dca80 这个提交。

操作已经成功完成，远程和本地仓库现在都已经回到指定的提交版本。如果没有其他问题，现在的代码状态就是你想要的回退版本。如果其他开发人员也在使用这个仓库，请注意告知他们，由于使用了 --force，他们需要重新同步代码。



# 创建一个仓库
git init
git config --global user.name "Lidang-Jiang"
git config --global user.email "lidangjiang@gmail.com"

git add .
git commit -m "update"
# 这里的地址是你的仓库地址
git remote add origin https://github.com/Lidang-Jiang/single_branch.git 
git push -u origin master



# 在指定 OSS 路径时，应该使用两个斜杠 // 而不是一个斜杠 /。正确的命令格式应该是 oss://bucket-name/path/to/object。
ossutil cp -r oss://ossshenzhen01/two_stream/single_node/run_no_valid_rul/20231107_1200/dual_stream_without_attention/models/ /home/lidangjiang/下载/      --update 



# vscode中如何删除掉所有的中文注释

正则表达式可以是这样的：

css
Copy code
#(?![0-9a-fA-F]{3,6}\b).*[\u4e00-\u9fa5]+.*

启用正则表达式搜索：

点击搜索框旁的 .* 图标或按 Alt + R 来启用正则表达式模式。
输入正则表达式：

在搜索框中输入之前讨论的正则表达式：#(?![0-9a-fA-F]{3,6}\b).*[\u4e00-\u9fa5]+.*。
输入替换文本：

在替换框中，你可以输入 \n 来表示换行符。这意味着找到的匹配项将被换行符替换





# 如何用命令查看某个文件夹下所有文件的数量,及内存占用
echo "文件数量: $(find /mnt/data/two_stream -type f | wc -l)"; echo "磁盘占用: $(du -sh /mnt/data/two_stream | awk '{print $1}')"








# 在查找和替换框中，点击左侧的 .* 图标以启用正则表达式模式。
输入查找的正则表达式：

在查找框中输入正则表达式 \((\w+\d{4}\w+)\)。这个表达式将匹配形如 (yoshino2012birth) 的字符串，并捕获括号内的内容。
\( 和 \) 匹配左右圆括号。
(\w+\d{4}\w+) 是一个捕获组，匹配并捕获括号内的文本。
输入替换的内容：

在替换框中输入 \cite{$1}。这里 $1 代表第一个捕获组（即括号内匹配的文本）。
执行替换操作：

# 要在 Visual Studio Code (VSCode) 中将包含两篇及以上文献引用的括号从 (hong2020online;ren2020data;wei2020state;yi2023digital) 格式更改为 {hong2020online;ren2020data;wei2020state;yi2023digital}，您可以使用查找和替换功能，结合正则表达式来实现。以下是具体步骤：


#在查找框中输入正则表达式 \((\w+\d{4}\w+(;\s*\w+\d{4}\w+)+)\)。这个表达式将匹配形如 (hong2020online;ren2020data;wei2020state;yi2023digital) 的字符串，并捕获括号内的内容。
\( 和 \)：匹配左右圆括号。
(\w+\d{4}\w+(;\w+\d{4}\w+)+)：是一个捕获组，匹配并捕获括号内的文本，其中包含两个或更多用分号分隔的引用。

# ‘(5)’，在vscode中如何搜索形如这样‘()’+'数字'地形式。

在 VSCode 中使用正则表达式搜索时，你可以使用如下表达式来匹配形如“(数字)”的文本：
\(\d+\)
替换为(\ref{eq:1})

# 如何删除当前目录下除了'batch1.h5,batch2.h5     , batch3.h5     '之外的所有文件
find . -type f ! -name 'batch1.h5' ! -name 'batch2.h5' ! -name 'batch3.h5' -exec rm -f {} +

# 在Ubuntu终端中，你可以使用find和rm命令组合来删除以数字开始的所有文件。以下是一个示例命令：
bash
Copy code
find . -type f -name '[0-9]*' -exec rm -f {} +
# 如何删除名字中含有浮点数的文件呢

ChatGPT
在Ubuntu终端中，你可以使用find和grep命令组合来删除名字中含有浮点数的所有文件。以下是一个示例命令：

bash
Copy code
find . -type f | grep -E '\.[0-9]+_' | xargs rm -f

# 'valid_split_',如何删除以这个字符串开始的文件呢

ChatGPT
 要删除以特定字符串（在这里是valid_split_）开始的所有文件，你可以使用以下的find和rm命令组合：

bash
Copy code
find . -type f -name 'valid_split_*' -exec rm -f {} +



# 全局设置

如果你想让这些设置应用于你计算机上的所有 Git 仓库，你可以运行以下命令：

bash
Copy code
git config --global user.name "Lidang-Jiang"
git config --global user.email "lidangjiang@gmail.com"

# 执行以下命令来解压文件：

tar -xzvf Clash.for.Windows-0.20.34-x64-linux.tar.gz

# 压缩文件夹

打开终端，然后执行以下命令：

tar -czvf jupyterlab-try.tar.gz -C /home/lidangjiang jupyterlab-try

# 解压缩文件

要解压这个 jupyterlab-try.tar.gz 文件，你可以使用以下命令：

tar -xzvf jupyterlab-try.tar.gz -C /path/to/destination

# vim如何删除文件的所有内容

使用 :%delete
打开 Vim 编辑器并加载你的文件。
按 Esc 键确保你处于普通模式（Normal Mode）。
输入 :%delete，然后按 Enter。

# 更改命令行提示符为只显示当前目录和用户，并且颜色为红色

export PS1='\[\033[01;31m\]\u@\W\$\[\033[00m\] '

# 如果你的SSH服务器不支持RSA，那么确实，你可以通过在 /etc/ssh/sshd_config 文件中添加 PubkeyAcceptedKeyTypes=+ssh-rsa 来启用RSA支持

sudo vim /etc/ssh/sshd_config
添加RSA支持：在文件的合适位置（例如文件的底部），添加一行
PubkeyAcceptedKeyTypes=+ssh-rsa

重新启动SSH服务：保存并关闭配置文件后，你需要重新启动SSH服务，使新的设置生效。输入命令
sudo service ssh restart
来重新启动SSH服务。

# 订阅

https://airtcplink.com/link/fsZBzTd5b0PITIhJ?clash=1&log-level=info

# 在服务器上查看新挂载的磁盘，你可以使用以下命令：

sudo fdisk -l
: 这个命令会显示服务器上所有的磁盘和分区信息。新挂载的云盘应该会以一个新的设备（如/dev/vdb1，/dev/vdc等）的形式显示出来。

lsblk
这个命令会列出所有块设备（block device，磁盘和磁盘分区就是块设备）的层级结构，新挂载的云盘也会在这里显示出来。

如果你的云盘设备名是/dev/vdb1，你可以使用以下命令进行格式化和挂载：

# 如果你的云盘上已经有数据，且已经有文件系统，那么你不需要（也不应该）再执行 mkfs.ext4 /dev/vdb1这一步。这是因为 mkfs 命令会在磁盘上创建新的文件系统，这个过程会清除磁盘上的所有数据。

！！！# 创建文件系统，这里以ext4为例
sudo mkfs.ext4 /dev/vdb1

# 创建挂载点

sudo mkdir /mnt/my_cloud_disk

# 挂载云盘

sudo mount /dev/vdb1 /mnt/my_cloud_disk

# 查看挂载情况

df -h

# 备份 /etc/fstab 文件

sudo cp /etc/fstab /etc/fstab.bak

# 编辑 /etc/fstab 文件 如果你希望它在重启之后仍然挂载，你需要在/etc/fstab文件中添加一个条目。

sudo vim /etc/fstab

/dev/vdb1 /mnt/my_cloud_disk ext4 defaults 0 0

保存并关闭文件后，你可以使用
sudo mount -a

命令来检查/etc/fstab文件是否有错误。如果这个命令没有任何输出，那么通常就表示/etc/fstab文件中的配置是正确的。

# conda如何安装shutil h5py numpy matplotlib IPython sklearn

conda install h5py scikit-learn matplotlib ipython imageio torchvision -y

# conda如何安装jupyterlab，并将conda环境添加到jupyter中，使得jupyter可以使用conda环境。

conda install -c conda-forge jupyterlab
conda install nb_conda

# 注意：每当你创建一个新的conda环境并且想要在Jupyter中使用时，你需要在那个环境中安装nb_conda。

# 文件操作相关的命令

#使用 chmod 命令给文件添加执行权限。在你的情况下，应该是这样的命令：
chmod +x name.AppImage

# 使用apt，wget，dpkg等工具，这个过程可以被大大简化，使得用户可以方便地安装和管理软件。

# apt相关的命令

#使用以下命令来查看哪些软件包可以升级：
apt list --upgradable
#这个输出确实表明有21个软件包可以升级，但是由于某种原因，它们没有被升级。这可能是因为这些软件包被设定为"hold"状态，这意味着它们被设置为不进行自动升级。这通常是因为升级这些软件包可能会导致系统不稳定或者与其他软件包的依赖关系冲突。
sudo apt-get dist-upgrade
#sudo apt-get install -f命令是用来尝试自动修复因为依赖关系问题导致的软件包安装问题。-f参数是--fix-broken的简写，它告诉apt-get尝试修复任何有问题的软件包。
#sudo apt-get remove '^nvidia-.*'：这个命令会删除与Nvidia相关的软件包，但是它会保留配置文件。sudo apt-get remove --purge '^nvidia-.*'：这个命令不仅会删除与Nvidia相关的软件包，还会删除它们的配置文件。--purge 选项就是用来删除配置文件的。
apt：这是Ubuntu和其他基于Debian的Linux发行版的包管理工具。它可以用来安装、更新和删除软件包。例如，sudo apt-get install git命令就是使用apt工具从Ubuntu的软件仓库中安装git软件。

# wget：这是一个从网络上下载文件的工具。它可以下载HTTP、HTTPS和FTP协议的网页或文件。例如，wget https://repo.anaconda.com/miniconda/Miniconda3-py39_23.5.2-0-Linux-x86_64.sh命令就是使用wget工具从指定的URL下载一个文件。

# dpkg：这是Debian和基于Debian的Linux发行版的底层包管理工具。它可以直接处理.deb格式的软件包，但是它不能处理软件包之间的依赖关系。通常，我们会使用apt工具来处理软件包的依赖关系，而apt工具在底层就是使用dpkg工具来安装和删除软件包的。

sudo dpkg -i package.deb
在这个命令中，-i参数是install的缩写，表示安装软件包。
安装一个.deb格式的软件包的过程大致包括以下步骤：

解压软件包：dpkg会解压.deb文件，获取其中的文件和元数据。

检查依赖关系：dpkg会检查软件包的依赖关系，确保所有需要的其他软件包都已经安装。如果有未满足的依赖关系，dpkg会报错并停止安装过程。

复制文件：dpkg会将软件包中的文件复制到系统的适当位置。例如，二进制文件通常会被复制到/bin或/usr/bin目录，库文件通常会被复制到/lib或/usr/lib目录，配置文件通常会被复制到/etc目录。

设置配置：如果软件包包含了一些需要在安装时设置的配置，dpkg会运行相应的脚本来设置这些配置。

# 更新数据库：最后，dpkg会更新其内部数据库，记录下这个软件包已经被安装，以及它的文件被安装到了哪些位置。

dpkg的其他常用参数包括：

-r或--remove：删除一个已安装的软件包。
-P或--purge：删除一个已安装的软件包，包括其配置文件。
-l或--list：列出所有已安装的软件包。
-s或--status：显示一个已安装软件包的状态信息。
-L或--listfiles：列出一个已安装软件包的所有文件。

# dpkg不能处理软件包之间的依赖关系。如果你试图安装一个依赖其他软件包的软件包，你可能会遇到依赖问题。在这种情况下，你可以使用apt-get或apt工具来自动解决依赖问题。

如果你需要安装的软件包有很多依赖，或者你不确定它的依赖，使用如apt、yum或dnf这样的高级包管理工具会更方便。如果你知道你的软件包没有依赖，或者你已经手动处理了所有的依赖，你也可以使用dpkg或rpm这样的低级工具来安装软件包。
如果你想删除无用的依赖包，你可以使用apt autoremove命令。
如果你想检查git软件包的依赖关系，你可以使用以下命令：
apt-cache depends git
使用以下命令来检查系统中所有已安装软件包的依赖关系：
/usr/lib/update-notifier/apt-check --human-readable
在Ubuntu和其他基于Debian的系统中，apt-cache depends命令和/usr/lib/update-notifier/apt-check --human-readable命令都会检查软件包的依赖关系，包括库文件和二进制文件。

# sudo apt-get purge git：这个命令会卸载git软件包，并且删除它的配置文件。在大多数情况下，当你卸载一个软件包时，它的配置文件会被保留，以便在你重新安装该软件包时可以使用。但是，如果你使用purge命令卸载一个软件包，那么它的配置文件也会被删除。

sudo apt autoremove：这个命令会删除所有不再被任何已安装软件包所依赖的软件包。当你安装一个软件包时，它可能会自动安装一些依赖包。当你卸载这个软件包时，这些依赖包可能不再需要，但它们不会被自动删除。你可以使用autoremove命令来删除这些不再需要的依赖包。

sudo apt-get remove git：这个命令会卸载git软件包，但保留它的配置文件。这和purge命令的区别在于，remove命令不会删除软件包的配置文件。

总的来说，如果你想彻底卸载一个软件包并删除它的配置文件，你可以使用purge命令。如果你只想卸载一个软件包但保留它的配置文件，你可以使用remove命令。如果你想删除不再需要的依赖包，你可以使用autoremove命令。

# dpkg工具也可以用来安装那些不在软件源中的.deb文件。虽然apt工具也可以安装.deb文件，但是如果这个.deb文件有很多依赖，而这些依赖包不在软件源中，apt工具可能无法正确处理这些依赖。在这种情况下，你可以先使用dpkg工具安装.deb文件，然后使用apt-get -f install命令来修复依赖关系。

# 常识

软件包：在Linux中，软件通常以软件包的形式分发。一个软件包是一个包含了软件的二进制文件、配置文件、文档等内容的压缩文件。在基于Debian的系统中，软件包通常是.deb格式的文件，而在基于Red Hat的系统中，软件包通常是.rpm格式的文件。

安装包：这是软件包的另一个常见名称，它和软件包是同一个概念。

已安装程序：当你使用包管理工具（如apt或dpkg）安装一个软件包时，包管理工具会解压软件包，将其中的文件复制到系统的适当位置，然后设置必要的配置。这个过程就是安装程序。所以，一个已安装的程序就是已经被安装到系统中的软件。

二进制文件：这是已编译的程序文件，可以直接在计算机上运行。在一个软件包中，二进制文件通常位于/bin或/usr/bin目录下。

库文件：库文件是包含了一组函数和程序例程的文件，这些函数和程序例程可以被其他程序使用。在一个软件包中，库文件通常位于/lib或/usr/lib目录下。

关于--purge参数，你可能是在apt-get remove命令中看到的。apt-get remove --purge git命令和apt-get purge git命令的效果是一样的，都是卸载git软件包并删除它的配置文件。在这个命令中，--purge参数告诉apt-get在卸载软件包的同时删除它的配置文件。

例如，假设你有一个名为package.deb的软件包，你可以使用sudo dpkg -i package.deb命令来安装它。安装后，你可以在/bin或/usr/bin目录下找到它的二进制文件，可以在/lib或/usr/lib目录下找到它的库文件。如果你想卸载这个软件包，你可以使用sudo apt-get remove package命令。如果你还想删除它的配置文件，你可以使用sudo apt-get purge package命令。
"卸载"和"删除"这两个词通常被用来描述相似的过程，即从系统中移除一个软件包。然而，它们之间有一些微妙的差别。

卸载：这通常指的是移除软件包的主要部分，比如二进制文件（可以执行的程序文件），但是可能会保留一些用户数据或配置文件。例如，当你在Ubuntu中使用apt-get remove命令卸载一个软件包时，它会移除软件包的主要部分，但是可能会保留在/etc目录下的配置文件。

删除：这通常指的是完全移除软件包，包括主要部分和用户数据或配置文件。例如，当你在Ubuntu中使用apt-get purge命令删除一个软件包时，它会移除软件包的主要部分，同时也会删除在/etc目录下的配置文件。

所以，当我说"卸载git软件包"时，我是指移除git软件包的主要部分，但可能会保留一些用户数据或配置文件。如果你想完全删除git软件包，包括它的用户数据和配置文件，你应该使用apt-get purge git命令。

"程序例程"是一个比较通用的术语，它指的是执行特定任务的一段程序代码。这个术语并不特指进程或线程。

在编程中，我们经常需要执行一些重复的任务，例如读取文件、发送网络请求、进行数学计算等。为了避免在每次需要执行这些任务时都重新编写代码，我们通常会将这些任务的代码写成函数或方法，然后在需要的时候调用这些函数或方法。这些函数或方法就是所谓的"程序例程"。

# Ubuntu系统第一次开机后，你可能需要进行以下操作：

#通过运行sudo apt update && sudo apt upgrade -y确保你的系统是最新的。这将更新所有的包和内核到仓库中的最新版本。
sudo apt update && sudo apt upgrade -y
#使用以下命令来自动安装推荐的驱动：
sudo ubuntu-drivers autoinstall

# 驱动相关的命令

#列出可用的驱动版本
sudo ubuntu-drivers devices
#在安装新的驱动之前，先卸载旧的驱动通常是一个好的做法。你可以按照以下步骤来卸载旧的驱动：
#使用以下命令来查看
nvidia-smi
#使用apt-get命令来卸载旧的驱动。例如，如果你的驱动版本是525，你可以使用以下命令来卸载它： 这个命令会卸载所有的NVIDIA驱动。
sudo apt-get remove --purge nvidia-*
#在Ubuntu上，你可以使用NVIDIA X Server Settings工具来设置你的NVIDIA显卡为高性能模式。以下是具体步骤：
nvidia-settings

# 如何更改apt的源为清华源

备份原有的sources.list文件
首先，建议备份你当前的sources.list文件，以便在需要时能够恢复到原始设置。

sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
编辑sources.list文件
使用你在终端里面使用的编辑器（如vim）打开sources.list文件。

sudo vim /etc/apt/sources.list
##########################################################################

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse

# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse

# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用

# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse

# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse

###########################################################################

# 显示器&win磁盘挂载

# 多显示器的切换问题   #打开配置文件

sudo vim /etc/gdm3/custom.conf
WaylandEnable=false
#当你取消这行代码的注释，实际上是禁用了Wayland，使得GDM和GNOME
#桌面环境回退到使用旧的X.org显示服务器。X.org在某些方面（
#如远程桌面支持）比Wayland更成熟，
#因此，当你禁用Wayland后，别人可能就能正常地远程操控你的电脑了。
#在你准备重启到Windows系统之前，是需要取消挂载的。否则，可能会在Windows下遇到一些问题，例如文件系统错误。
sudo umount /mnt/windows
#这个命令将尝试修复你的 NTFS 分区，如果它被 Windows 的快速启动或休眠模式锁定，这个命令将解除锁定。
sudo ntfsfix /dev/nvme0n1p3
#在你下次想在Ubuntu中访问Windows分区时，你需要重新执行挂载命令：

# sudo mount -t ntfs -o rw,auto,user,fmask=0022,dmask=0000 /dev/nvme0n1p3 /mnt/windows

sudo mount -t ntfs -o rw,auto,user,exec,umask=0000 /dev/nvme0n1p3 /mnt/windows

sudo  apt  update  &&  sudo  apt  upgrade  -y
sudo  ubuntu-drivers  autoinstall

# 新的桌面环境

sudo  apt  install  gdm3  lightdm

# 卸载驱动

sudo  apt  remove  --purge  nvidia*

# nvidia驱动安装

sudo  apt  install   nvidia-driver-535  -y

# GNOME设置中心

sudo apt install gnome-control-center

# 设置代理

rm -rf ~/.gitconfig
设置 HTTP 和 HTTPS 代理
设置 HTTP 代理

git config --global http.proxy http://127.0.0.1:7890
这个命令会设置一个全局的 HTTP 代理，地址是本地的 127.0.0.1，端口是 7890。

设置 HTTPS 代理

git config --global https.proxy https://127.0.0.1:7890
这个命令会设置一个全局的 HTTPS 代理，地址也是本地的 127.0.0.1，端口是 7890。

禁用 SSL 证书验证（不推荐，但如果你愿意承担风险）

git config --global http.sslVerify false
这个命令会全局禁用 SSL 证书验证。

取消代理设置
如果以后你想取消这些设置，可以使用以下命令：

取消 HTTP 代理

git config --global --unset http.proxy
取消 HTTPS 代理

git config --global --unset https.proxy
启用 SSL 证书验证

git config --global http.sslVerify true

###########################################################

# 假设你是一个高级算法工程师，我是一个编程新手。我的操作系统是ubuntu22年的版本。我接下来会向你请教问题，注意我所有的问题，你都应该用中文详细的回答我 。

# 假设你是一个linux高级工程师，我是一个编程新手。我的操作系统是ubuntu22年的版本。我接下来会向你请教问题，注意我所有的问题，你都应该用中文详细的回答我 。

# 地址

交易关联的地址

LIDANG JIANG
1403 12th Street Northwest
Washington, District of Columbia 20005
United States

# 代理 apt

使用 HTTP 代理而非 HTTPS：尝试在 /etc/apt/apt.conf.d/proxy.conf 文件中仅使用 HTTP 代理，即使对于 HTTPS 请求。

Acquire::http::Proxy "http://127.0.0.1:7890";
Acquire::https::Proxy "http://127.0.0.1:7890";

# 在 ~/.bashrc 文件中添加以下行

export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

source ~/.bashrc

要检查环境变量是否已正确设置，你可以使用 echo 命令：

echo $http_proxy
echo $https_proxy

将用户添加到 docker 组:

sudo usermod -aG docker $USER
然后重新登录或者运行 newgrp docker 以应用新的组设置。

rsync -av  --progress  /mnt/data/two_stream/aliyun/4InceptionResnet_hdc_resnet_Attention/   /mnt/workspace/

rsync -av  --progress  /mnt/workspace/      /mnt/data/two_stream/aliyun/4InceptionResnet_hdc_resnet_Attention/

 PS1='\[\033[01;31m\]\u@\W\$\[\033[00m\] '

conda install h5py numpy matplotlib ipython scikit-learn

#多显示器的切换问题   #打开配置文件

git config --global https.https://github.com.proxy https://127.0.0.1:7890
#这个命令会取消全局的 https 代理设置。

git config --global --unset https.https://github.com.proxy

# 手机

+00447729478465


# depay
LIDANG JIANG

5319  9362  8918  6603  

04/2026

654

LIDANG JIANG
1403 12th Street Northwest
Washington
Washington, District of Columbia 20005
United States
lidang_jiang@proton.me




# QQ音乐
如何操作：
打开终端：点击Ubuntu的应用菜单，然后搜索“Terminal”并打开它。

编辑桌面入口文件：在终端中输入以下命令并按回车键：

bash
Copy code
sudo vim /usr/share/applications/qqmusic.desktop
输入你的密码并按回车键。

找到并修改Exec行：在打开的vim编辑器中，找到Exec=/opt/qqmusic/qqmusic %U这一行。

使用方向键移动到这一行。
按i进入插入模式。
修改这一行为Exec=/opt/qqmusic/qqmusic --no-sandbox %U。
保存并退出：

按Esc键退出插入模式。
输入:wq并按回车键保存并退出。
重启GNOME Shell：

同时按下Alt和F2键。
在弹出的对话框中输入r。
按回车键。
重新启动QQ音乐：关闭所有正在运行的QQ音乐实例，然后重新启动它。

这样，你应该能够解决QQ音乐在Ubuntu 22.04上闪退的问题。

# 模型服务灵积-API-KEY管理
sk-cf81fcce1dde4ef4bd8e484ae7ad36f5







# 如何将‘/mnt/data/two_stream/aliyun/4InceptionResnet_hdc_resnet_Attention’，这个文件夹下的所有文件同步到‘/mnt/workspace’下

# 请注意，源目录后面的斜杠/很重要，它表示同步该目录下的内容，而不是整个目录本身。

rsync -av /mnt/data/two_stream/single_node/   /mnt/workspace/

rsync -av   /mnt/workspace/      /mnt/data/two_stream/single_node/