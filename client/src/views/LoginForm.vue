<template>
    <div class="my-5 container col-5">
        <form @submit.prevent="userLogin">
            <fieldset>
                <legend>Login Form</legend>
                <p style="color: red; font-size: 1.3em;"><strong>{{error}}</strong></p>
                <div class="form-group my-4">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password" v-model="password">
                </div>
            </fieldset>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <p class="my-4">Do not have an account? Please <router-link class="my-5" to="/register"><u>Register</u></router-link></p>
        <hr>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        userLogin() {
            server({
                url: `/users/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id)
                localStorage.setItem('role', data.role)
                this.$store.commit("SetIsLogin", true)
                this.$store.commit("SetUserLoginId", `${data.id}`)
                this.$store.dispatch('getUnconfirmedTransaction')
                this.$store.dispatch('getTransactionHistories')
                Toast.fire({
                    type: 'success',
                    title: 'Signed in successfully'
                })
                if (data.role === 'admin') {
                    this.$store.dispatch('getUnconfirmedTransactionForAdmin')
                    this.$store.dispatch('getTransactionHistoriesForAdmin')
                    this.$store.commit('SetIsAdmin', true)
                    this.$router.push('/admin')
                } else {
                    this.$store.dispatch('getMyCart')
                    this.$router.push('/shop')
                }
            })
            .catch(err => {
                this.error = err.response.data.msg
            })
        }
    }
}
</script>

<style>

</style>
