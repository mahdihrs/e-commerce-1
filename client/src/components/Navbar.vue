<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand" to="/">marché</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor03">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/shop">Shop <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/login" v-if="!isLogin">Login <span class="sr-only"></span></router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/admin" v-if="isAdmin">Admin Page <span class="sr-only"></span></router-link>
                    </li>
                </ul>
                <div v-if="isLogin" class="nav-item active">
                    <router-link class="nav-link" to="/transactions">Transactions</router-link>
                    <!-- <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search">
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form> -->
                </div>
                <div style="font-size: 1.5em;" class="col-1" @click="toMyCart">
                    <i class="fas fa-shopping-cart pointtoit"></i>
                    <span class="pointtoit">( {{ totalCart }} )</span>
                </div>
                <div>
                    <button class="btn btn-primary" @click="logout" v-if="isLogin">Logout</button>
                </div>
            </div>
        </nav>
        <div v-if="loading" style="position: absolute;">
            <img src="https://cdn.dribbble.com/users/31776/screenshots/754788/loading_cart.gif" alt="" height="150">
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { setTimeout } from 'timers';

export default {
    name: 'Navbar',
    data() {
        return {
            loading: false
        }
    },
    computed: {
        totalCart() {
            // return this.$store.state.myCart.products.length
            return this.myCart.products.length
        },
        ...mapState([
            'isLogin',
            'isAdmin',
            'myCart'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        toMyCart() {
            if (!localStorage.getItem('token')) {
                this.$router.push('/login')
            } else {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.$router.push('/cart')
                }, 1500)
            }
        }
    }
}
</script>

<style>
.pointtoit {
    cursor: pointer;
}
</style>