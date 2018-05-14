import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import ALogin from '../pages/admin/login/Login.vue'
import Register from '../pages/front/login/Register.vue'
import Basic from '../pages/admin/setting/Basic.vue'
import Navigation from '../pages/admin/setting/Navigation.vue'
import ModifyPassword from '../pages/admin/setting/ModifyPassword.vue'
import UserList from '../pages/admin/user/UserList.vue'
import UserCreate from '../pages/admin/user/UserCreate.vue'
import BookList from '../pages/admin/book/BookList.vue'
import BookCreate from '../pages/admin/book/BookCreate.vue'
import TagList from '../pages/admin/tag/TagList.vue'
import TagCreate from '../pages/admin/tag/TagCreate.vue'
import CateList from '../pages/admin/cate/CateList.vue'
import CateCreate from '../pages/admin/cate/CateCreate.vue'
import CommentList from '../pages/admin/comment/CommentList.vue'
import Dashboard from '../pages/admin/Dashboard.vue'
import Admin from '../pages/admin/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // admin
    {
      path: '/admin/login',
      name: 'login',
      component: ALogin
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        // 基础设置管理
        {
          path: 'setting-basic',
          name: 'setting-basic',
          component: Basic
        },
        {
          path: 'setting-navigation',
          name: 'setting-navigation',
          component: Navigation
        },
        {
          path: 'modify-password',
          name: 'modify-password',
          component: ModifyPassword
        },
        // 用户管理
        {
          path: 'user-list',
          name: 'user-list',
          component: UserList
        },
        {
          path: 'user-create',
          name: 'user-create',
          component: UserCreate
        },
        // 书籍管理
        {
          path: 'book-list',
          name: 'book-list',
          component: BookList
        },
        {
          path: 'book-create',
          name: 'book-create',
          component: BookCreate
        },
        // 标签管理
        {
          path: 'tag-list',
          name: 'tag-list',
          component: TagList
        },
        {
          path: 'tag-create',
          name: 'tag-create',
          component: TagCreate
        },
        // 分类管理
        {
          path: 'cate-list',
          name: 'cate-list',
          component: CateList
        },
        {
          path: 'cate-create',
          name: 'cate-create',
          component: CateCreate
        },
        // 评论管理
        {
          path: 'comment-list',
          name: 'comment-list',
          component: CommentList
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
