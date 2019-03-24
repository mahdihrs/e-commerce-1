<template>
  <div class="home">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar
  },
  created() {
    this.resetUserInfo()
    this.getAllProducts()
    this.$store.dispatch('getMyCart')
    this.$store.dispatch('getCityList')
    this.$store.dispatch('getUnconfirmedTransaction')
    this.$store.dispatch('getTransactionHistories')
    this.$store.dispatch('getUnconfirmedTransactionForAdmin')
    this.$store.dispatch('getTransactionHistoriesForAdmin')
  },
  methods: {
    resetUserInfo() {
      let commit = this.$store.commit
      if(localStorage.getItem('token')) {
        this.commitMut('SetUserLoginId', localStorage.getItem('id'))
        this.commitMut('SetIsLogin', true)
        if (localStorage.getItem('role') === 'admin') {
          this.commitMut('SetIsAdmin', true)
        }
      }
    },
    commitMut(mutation, payload) {
      if (payload) {
        this.$store.commit(mutation, payload)
      } else {
        this.$store.commit(mutation)
      }
    },
    getAllProducts() {
      this.$store.dispatch('getAllProducts')
    }
  }
}
</script>
