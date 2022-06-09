// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: '/my_docs/', /* 基础虚拟路径 */
  dest: 'docs/dist', /* 打包文件基础路径, 在命令所在目录下 */
  title: 'Yongqi Zhang', // 标题
  description: 'Portfolio', // 标题下的描述
  
  themeConfig: { // 主题配置
    nav: [ // 头部导航
      { text: 'Portfolio', link: 'http://www.yongqi.ml' },
    ],
    sidebar: [ // 左侧导航
      'Hundfutter/1_Hund-Projektbeschreibung.md',
      {
        title: 'Detaillierte Entwicklung',
        collapsable: true,
        children: [
          'Hundfutter/01_Starten.md',
          'Hundfutter/02_Code-Verzeichnisdesign',
          'Hundfutter/03_ESLint',
          'Hundfutter/04_git',
          'Hundfutter/05_Vue Components',
          'Hundfutter/06_vue-router',
          'Hundfutter/07_less',
          'Hundfutter/08_Header',
          'Hundfutter/09_Footer',
          'Hundfutter/10_Home',
          'Hundfutter/11_后台应用',
          'Hundfutter/12_前后台交互ajax',
          'Hundfutter/13_使用vuex管理状态',
          'Hundfutter/14_异步显示分类列表 TypeNav',
          'Hundfutter/15_动态显示广告轮播',
          'Hundfutter/16_Mock数据接口',
          'Hundfutter/17_利用Mock接口实现动态的Home',
          'Hundfutter/18_Search路由',
          'Hundfutter/19_Detail路由',
          'Hundfutter/20_AddCartSuccess路由',
          'Hundfutter/21_ShopCart路由',
          'Hundfutter/22_注册与登陆路由',
          'Hundfutter/23_导航守卫',
          'Hundfutter/24_订单与支付',
          'Hundfutter/25_其它'
        ]
      }
    ]
  },

  head: [ // 指定网页head图标
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
  ]
}