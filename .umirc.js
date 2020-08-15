
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    ['umi-plugin-react',
      {
        dva: true,
        antd: true,
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/filemanage', component: '../pages/filemanage/index'}
      ]
    }
  ]
}
