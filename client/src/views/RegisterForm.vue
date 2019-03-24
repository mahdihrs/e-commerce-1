<template>
    <div class="my-5 container col-7">
        <form @submit.prevent="register">
            <fieldset>
                <legend>Register Form</legend>
                <div class="form-group my-4">
                    <label>Full Name</label>
                    <input type="text" class="form-control" placeholder="Enter Full Name" v-model="name">
                    <p style="color: red; font-size: 1em;"><strong>{{nameError}}</strong></p>
                </div>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="text" class="form-control" placeholder="Enter email" v-model="email">
                    <p style="color: red; font-size: 1em;"><strong>{{emailError}}</strong></p>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                    <p style="color: red; font-size: 1em;"><strong>{{passwordError}}</strong></p>
                </div>                
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" placeholder="Write your address" v-model="address">
                    <p style="color: red; font-size: 1em;"><strong>{{addressError}}</strong></p>
                </div>                
            </fieldset>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <p class="my-4">Already have an account? <router-link class="my-5" to="/login"><u>Login</u></router-link></p>
        <hr>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
    name: 'register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            address: '',
            //errors
            nameError: '',
            emailError: '',
            passwordError: '',
            addressError: ''
        }
    },
    methods: {
        register() {
            this.nameError = ''
            this.emailError = ''
            this.passwordError = ''
            this.addressError = ''
            server({
                url: `/users/register`,
                method: 'post',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    address: this.address
                }
            })
            .then(({data}) => {
                // localStorage.setItem('token', data.token)
                // localStorage.setItem('id', data.id)
                // this.$store.commit("SetUserLoginId", `${data.id}`)
                // this.$store.commit("SetIsLogin", true)
                this.$router.push('/login')
            })
            .catch(err => {
                let error = ["'name'", 'email', 'password', 'address']
                let response = err.response.data.msg.split(', ')
                response.forEach(e => {
                    let spaced = e.toLowerCase().split(' ')
                    error.forEach(err => {
                        let findErr = spaced.find(findIt => findIt === err)
                        if (findErr === "'name'") this.nameError = e
                        else if (findErr === 'email') this.emailError = e
                        else if (findErr === 'password') this.passwordError = e
                        else if (findErr === 'address') this.addressError = e
                    })
                })
            })
        }
    }
}
</script>

<style>

</style>
