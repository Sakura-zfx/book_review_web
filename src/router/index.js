import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import ALogin from '../pages/admin/login/Login.vue'
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
import Billboard from '../pages/front/Billboard'
import New from '../pages/front/New.vue'
import Search from '../pages/front/Search'
import BookDeatail from '../pages/front/BookDetail'
import Recommendation from '../pages/front/Recommendation'
import RetrievePassword from '../pages/front/RetrievePassword'
import UserDetail from '../pages/front/UserDetail'
import DefaultPage from '../pages/front/DefaultPage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '',
      component: Index,
      children: [{
          path: '/billboard',
          name: 'billboard',
          component: Billboard
        },
        {
          path: '/new',
          name: 'new',
          component: New
        },
        {
          path: '/recommendation',
          name: 'recommendation',
          component: Recommendation
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/user-detail',
          name: 'user-detail',
          component: UserDetail
        },
        {
          path: '/book-detail',
          name: 'book-detail',
          component: BookDeatail
        },
        {
          path: '/retrieve-password',
          name: 'retrieve-password',
          component: RetrievePassword
        },
        {
          path: '',
          name: 'default-page',
          component: DefaultPage
        }
      ]
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
