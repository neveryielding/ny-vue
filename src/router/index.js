import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const LayoutComponent = Layout
export const _import_ = _import
/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: { title: 'dashboard', icon: 'dashboard', noCache: true },
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/sys/admin',
  //   component: Layout,
  //   redirect: '',
  //   name: 'systemAdmin',
  //   meta: {
  //     title: 'systemAdmin',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: _import('admin/user/index'),
  //       name: 'systemAdminUser',
  //       meta: { title: 'systemAdminUser' }
  //     },
  //     {
  //       path: 'menu',
  //       component: _import('admin/menu/index'),
  //       name: 'systemAdminMenu',
  //       meta: { title: 'systemAdminMenu' }
  //     },
  //     {
  //       path: 'role',
  //       component: _import('admin/role/index'),
  //       name: 'systemAdminRole',
  //       meta: { title: 'systemAdminRole' }
  //     },
  //     {
  //       path: 'group',
  //       component: _import('admin/userGroup/index'),
  //       name: 'systemAdminUserGroup',
  //       meta: { title: 'systemAdminUserGroup' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table/complex-table',
  //   name: 'example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('dashboard/index'),
  //       redirect: '/example/table/complex-table',
  //       name: 'Table',
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       },
  //       children: [
  //         { path: 'dynamic-table', component: _import('dashboard/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //         { path: 'drag-table', component: _import('dashboard/index'), name: 'dragTable', meta: { title: 'dragTable' }},
  //         { path: 'inline-edit-table', component: _import('dashboard/index'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //         { path: 'tree-table', component: _import('dashboard/index'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
  //         { path: 'custom-tree-table', component: _import('dashboard/index'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
  //         { path: 'complex-table', component: _import('dashboard/index'), name: 'complexTable', meta: { title: 'complexTable' }}
  //       ]
  //     },
  //     { path: 'tab/index', icon: 'tab', component: _import('dashboard/index'), name: 'tab', meta: { title: 'tab' }}
  //   ]
  // },
  // {
  //   path: '/example1',
  //   component: Layout,
  //   redirect: '/example1/table/complex-table',
  //   name: 'example1',
  //   meta: {
  //     title: 'example1',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/example1/table',
  //       component: _import('dashboard/index'),
  //       redirect: '/example1/table/complex-table',
  //       name: 'Table',
  //       meta: {
  //         title: 'Table',
  //         icon: 'table'
  //       },
  //       children: [
  //         { path: 'dynamic-table', component: _import('dashboard/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
  //         { path: 'drag-table', component: _import('dashboard/index'), name: 'dragTable', meta: { title: 'dragTable' }},
  //         { path: 'inline-edit-table', component: _import('dashboard/index'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
  //         { path: 'tree-table', component: _import('dashboard/index'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
  //         { path: 'custom-tree-table', component: _import('dashboard/index'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
  //         { path: 'complex-table', component: _import('dashboard/index'), name: 'complexTable', meta: { title: 'complexTable' }}
  //       ]
  //     },
  //     { path: 'tab/index', icon: 'tab', component: _import('dashboard/index'), name: 'tab', meta: { title: 'tab' }}
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
