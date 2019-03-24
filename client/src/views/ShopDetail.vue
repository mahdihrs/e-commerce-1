<template>
    <div class="my-5">
        <!-- {{objectProduct}} -->
        <h2 class="justify-content-center mb-5">{{ objectProduct.name }}</h2>
        <hr class="col-9 mb-5">
        <div class="container d-flex">
            <div class="col-8">
                <img :src="objectProduct.image" alt="">
            </div>
            <div>
                <h4>marché</h4>
                <h5 class="my-5">{{objectProduct.name}}</h5>
                <p style="font-size:1.1em;">{{ objectProduct.description }}</p>
                <h6 style="font-size:1.2em;" class="my-4">{{ currencyConverter(objectProduct.price) }}</h6>
                <h6 style="font-size:1.2em;">Stock: {{ stockInterface(objectProduct.stock) }}</h6>
                <button class="btn btn-success my-5 btn-block" @click="addToCart">Add To Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import { mapState } from 'vuex'

export default {
    name: 'ShopDetail',
    created() {
        this.$store.dispatch('getProduct', this.$route.params.id)
    },
    computed: {
        ...mapState([
            'objectProduct'
        ])
    },
    data() {
        return {

        }
    },
    methods: {
        currencyConverter(num) {
            return `Rp ${num.toLocaleString()},00`
        },
        stockInterface(num) {
            if (num == 1) {
                return `${num} pc`
            } else {
                return `${num} pcs`
            }
        },
        addToCart() {
            this.$store.dispatch('addToCart', this.$route.params.id)
        }
    }
}
</script>

<style scoped>
hr {
  border:none;
  height: 20px;
 	width: 90%;
	height: 50px;
	margin-top: 0;
	border-bottom: 1px solid #1f1209;
    box-shadow: 0 15px 25px -20px #333;
    margin: -50px auto 10px; 
}
</style>
