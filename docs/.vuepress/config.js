// 注意: base的值为github仓库的名称(/不能少)
module.exports = {
  base: '/documentation/', /* 基础虚拟路径 */
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
          'Hundfutter/07_scss',
          'Hundfutter/08_Header',
          'Hundfutter/09_Footer',
          'Hundfutter/10_Home',
          'Hundfutter/11_vuex',
          'Hundfutter/12_Search',
          'Hundfutter/13_Detail',
          'Hundfutter/14_AddCartSuccess',
          'Hundfutter/15_Einkaufswagen',
          'Hundfutter/16_Anmelden und Register',
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