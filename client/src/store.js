import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/api/server'
import Swal from 'sweetalert2'
import router from './router.js'
import store from './store'

Vue.use(Vuex)

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000
});

export default new Vuex.Store({
  state: {
      isLogin: false,
      isAdmin: false,
      userLoginId: null,
      allProducts: [],
      objectProduct: null,
      myCart: {products: []},
      cities: [],
      myUnconfirmedTransactions: [],
      transactionHistories: [],
      unconfirmedTransactionsForAdmin: [],
      transactionHistoriesForAdmin: []
  },
  mutations: {
    SetUserLoginId(state, payload) {
        state.userLoginId = payload
    },
    SetIsLogin(state, payload) {
        state.isLogin = payload
    },
    SetIsAdmin(state, payload) {
        state.isAdmin = payload
    },
    SetAllProducts(state, payload) {
        state.allProducts = payload
    },
    SetObjectProduct(state, payload) {
        state.objectProduct = payload
    },
    SetMyCart(state, payload) {
        state.myCart = payload
    },
    SetCities(state, payload) {
        state.cities = payload
    },
    SetMyUnconfirmedTransactions(state, payload) {
        state.myUnconfirmedTransactions = payload
    },
    SetTransactionHistories(state, payload) {
        state.transactionHistories = payload
    },
    SetUnconfirmedTransactionsForAdmin(state, payload) {
        state.unconfirmedTransactionsForAdmin = payload
    },
    SetTransactionHistoriesForAdmin(state, payload) {
        state.transactionHistoriesForAdmin = payload
    }
  },
  actions: {
    logout({commit}) {
        Swal.fire('Bye bye')
        commit('SetUserLoginId', null)
        commit("SetIsLogin", false)
        commit("SetIsAdmin", false)
        commit('SetMyCart', {products: []})
        commit('SetMyUnconfirmedTransactions', [])
        commit('SetTransactionHistories', [])
        localStorage.removeItem('token')
        router.push('/')
    },
    getAllProducts({commit}) {
        server({
            url: `/products`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetAllProducts', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getProduct({commit}, id) {
        server({
            url: `/products/${id}`,
            method: 'get',
        })
        .then(({data}) => {
            commit('SetObjectProduct', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    removeProduct({commit}, id) {
        let products = [...store.state.allProducts]
        server({
            url: `/products/${id}`,
            method: 'delete',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            let idx = products.findIndex(e => e._id == id)
            products.splice(idx, 1)
            commit('SetAllProducts', products)
            router.push('/admin/all-products')
            Swal.fire(
                'Deleted!',
                `${data}`,
                'success'
            )
        })
        .catch(err => {
            console.log(err)
        })
    },
    addToCart({commit, dispatch}, product) {
        server({
            url: `/carts/add-to-cart/${product}`,
            method: 'put',
            headers: {
                access_token: localStorage.getItem('token')
            },
        })
        .then(({data}) => {
            Toast.fire({
                type: 'success',
                title: `${data.msg}`
            })
            dispatch('getMyCart')
        })
        .catch(err => {
            console.log(err)
        })
    },
    getMyCart({commit}) {
        server({
            url: `/carts`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetMyCart', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getCityList({commit}) {
        server({
            url: `/shipping/cities`,
            method: 'get',
        })
        .then(({data}) => {
            commit('SetCities', data.rajaongkir.results)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getUnconfirmedTransaction({commit}) {
        server({
            url: `/transactions/my-transactions?filter=undelivered`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetMyUnconfirmedTransactions', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTransactionHistories({commit}) {
        server({
            url: `/transactions/my-transactions?filter=delivered`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetTransactionHistories', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getUnconfirmedTransactionForAdmin({commit}) {
        server({
            url: `/transactions?filter=undelivered`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetUnconfirmedTransactionsForAdmin', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    getTransactionHistoriesForAdmin({commit}) {
        server({
            url: `/transactions?filter=delivered`,
            method: 'get',
            headers: {
                access_token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            commit('SetTransactionHistoriesForAdmin', data)
        })
        .catch(err => {
            console.log(err)
        })
    },
  }
})