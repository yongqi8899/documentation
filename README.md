## 1.本地运行说明
- 运行命令: npm run doc:dev

## 2. 将当前项目文档发布到github pages
- 创建一个远程仓库 documentation
- 修改docs/.vuepress/config.js: base: '/documentation/'
- 打包文档: npm run doc:build
- 将项目推送到github
  - git init
  - git add .
  - git commit -m "init"
  - git push 
- 发布文档: npm run doc:deploy
- 访问在线文档: https://yongqi.ml/documentation/ 
