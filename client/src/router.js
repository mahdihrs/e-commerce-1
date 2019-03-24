import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "homepage" */ '@/views/HomepageContent.vue')
      }, {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/LoginForm.vue')
      }, {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register"*/ '@/views/RegisterForm.vue')
      }, {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/AdminPage.vue'),
      }, {
        path: '/admin/add-product',
        name: 'add-product',
        component: () => import(/* webpackChunkName: "add-product" */ '@/views/AddProduct.vue')
      }, {
        path: '/admin/all-products',
        name: 'all-products',
        component: () => import(/* webpackChunkName: "all-products" */ '@/views/ProductListAdmin.vue')
      }, {
        path: '/admin/p/detail/:id',
        name: 'product-detail',
        component: () => import(/* webpackChunkName: "product-detail" */ '@/views/ProductDetail.vue')
      }, {
        path: 'shop',
        name: 'shop',
        component: () => import(/* webpackChunkName: "shop" */ '@/views/Shop.vue')
      }, {
        path: '/shop/item-detail/:id',
        name: 'shop-detail',
        component: () => import(/* webpackChunkName: "shop-detail" */ '@/views/ShopDetail.vue')
      }, {
        path: 'cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue')
      }, {
        path: 'transactions',
        name: 'transactions',
        component: () => import(/* webpackChunkName: "transactions" */ '@/views/Transactions.vue')
      }, {
        path: '/admin/transactions',
        name: 'admin-transactions',
        component: () => import(/* webpackChunkName: "admin-transactions" */ '@/views/AdminTransactions.vue')
      }]
    }
  ]
})
