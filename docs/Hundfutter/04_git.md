
# 4. Git-Repository anlegen

## 4.1. neues repository erstellen

```shell
## 1). ein Remote-Repository erstellen
    

## 2). ein lokales Repository erstellen 
    git init
    git clone https://github.com/yongqi8899/documentation.git
    git add .
    git commit -m "first"
## 3). 将本地仓库的代码推送到远程仓库
    git remote add origin url (在本地记录远程仓库的地址)
    git push -u origin master

## 4). 如果本地代码有修改, 要提交到本地仓库, 推送到仓库
    git add .
    git commit -m "xxx"
    git push

    git config --global credential.helper store (记住用户和密码)

## 5). 如果远程代码有修改, 要拉取到本地仓库
    git pull

## 6). 将远程仓库的代码clone到本地(生成仓库)
    git clone url
```


