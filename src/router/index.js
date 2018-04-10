import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import Login from '../pages/login/Login.vue'
import Register from '../pages/login/Register.vue'
import Basic from '../pages/admin/setting/Basic.vue'
import Navigation from '../pages/admin/setting/Navigation.vue'
import UserList from '../pages/admin/user/UserList.vue'
import UserCreate from '../pages/admin/user/UserCreate.vue'
import ModifyPassword from '../pages/admin/user/ModifyPassword.vue'
import BookList from '../pages/admin/book/BookList.vue'
import BookCreate from '../pages/admin/book/BookCreate.vue'
import TagList from '../pages/admin/tag/TagList.vue'
import TagCreate from '../pages/admin/tag/TagCreate.vue'
import CateList from '../pages/admin/cate/CateList.vue'
import CateCreate from '../pages/admin/cate/CateCreate.vue'
import CommentList from '../pages/admin/comment/CommentList.vue'
import Dashboard from '../pages/admin/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  // admin
  {
    path: '/admin',
    name: 'admin',
    children: [
      // 基础设置管理
      {
        path: 'setting',
        name: 'setting',
        children: [
          {
            path: 'basic',
            name: 'basic',
            component: Basic
          },
          {
            path: 'navigation',
            name: 'navigation',
            component: Navigation
          }
        ]
      },
      // 用户管理
      {
        path: 'user',
        name: 'user',
        children: [
          {
            path: 'list',
            name: 'list',
            component: UserList
          },
          {
            path: 'create',
            name: 'create',
            component: UserCreate
          },
          {
            path: 'modify-password',
            name: 'modify-password',
            component: ModifyPassword
          }
        ]
      },
      // 书籍管理
      {
        path: 'book',
        name: 'book',
        children: [
          {
            path: 'list',
            name: 'list',
            component: BookList
          },
          {
            path: 'create',
            name: 'create',
            component: BookCreate
          }
        ]
      },
      // 标签管理
      {
        path: 'tag',
        name: 'tag',
        children: [
          {
            path: 'list',
            name: 'list',
            component: TagList
          },
          {
            path: 'create',
            name: 'create',
            component: TagCreate
          }
        ]
      },
      // 分类管理
      {
        path: 'cate',
        name: 'cate',
        children: [
          {
            path: 'list',
            name: 'list',
            component: CateList
          },
          {
            path: 'create',
            name: 'create',
            component: CateCreate
          }
        ]
      },
      // 评论管理
      {
        path: 'comment',
        name: 'comment',
        children: [
          {
            path: 'list',
            name: 'list',
            component: CommentList
          }
        ]
      },
      // 首页
      {
        path: '',
        name: 'dashboard',
        component: Dashboard
      }
    ]
  }
  ]
})