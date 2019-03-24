<template>
    <div class="my-5 mx-5">
        <h2>marché</h2>
        <div v-if="products.length === 0">
            <hr>
            <h1>Sorry you haven't add any product to your cart yet.</h1>
        </div>
        <div v-else>
            <h4 style="text-align: left;">My Cart</h4>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col-7">Product Detail</th>
                        <!-- <th scope="col">Column heading</th> -->
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productsToShowInCart" :key="product.id">
                        <td><img class="prod-img" :src="product.image" alt=""> 
                            <span class="ml-5">
                                <strong>{{ product.name }}</strong>
                            </span>
                        </td>
                        <td>{{ product.quantity }} <br>                     
                            <a href="#"><i 
                                style="font-size: 1.5em; color: red;" 
                                class="fas fa-minus-circle"
                                @click="removeOneProduct(product._id)">
                            </i></a></td>
                        <td>{{ countTotalPrice(product.quantity, product.price) }}</td>
                        <td>
                            <a href="#"><i
                                style="font-size: 2em; color: red;" 
                                class="far fa-trash-alt"
                                @click="removeProducts(product._id)">
                            </i></a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="productsInCart">
                <fieldset class="justify-content-center">
                    <legend>Shipping Option:</legend>
                    <div style="height: 100% !important;" class="form-group">
                        <select class="custom-select" @change="handleChange">
                            <option selected="">Select Cities</option>
                            <option v-for="city in cities" :key="city.id" :data-code="city.city_id" :value="city.city_id">{{ city.city_name }}</option>
                        </select>
                        <p style="color: red;">{{ cityValidation }}</p>
                    </div>
                    <div style="height: 100% !important;" class="form-group">
                        <select class="custom-select" @change="courierPref">
                            <option selected="">Courier Option</option>
                            <option data-courier="jne" value="jne">JNE</option>
                            <option data-courier="tiki" value="tiki">TIKI</option>
                            <option data-courier="post" value="post">POS</option>
                        </select>
                        <p style="color: red;">{{ courierValidation }}</p>
                    </div>
                    <!-- ---- -->
                    <button class="btn btn-info btn-sm mb-5" @click="shippingCostCheckToServer">Check Shipping Cost</button>
                    <!-- --- -->
                    <div v-if="loadingGenerateShippingCost">
                        <img src="https://i.gifer.com/7plQ.gif" alt="" height="150">
                    </div>
                    <div v-if="serviceOptionsGenerated" style="height: 100% !important;" class="form-group">
                        <select class="custom-select" @change="servicePreference">
                            <option data-courier="0" value="0">Select Service</option>
                            <option v-for="service in serviceOptions" :key="service.id" :data-service="service.cost[0].value" :value="service.cost[0].value">{{ service.description }}</option>
                        </select>
                        <p style="color: red;">{{ courierValidation }}</p>
                    </div>
                </fieldset>
            </div>

            <h5 class="my-3">Shipping cost: {{ currencyConverter(shippingCost) }}</h5>

            <h3>TOTAL: {{ totalPriceInCart() }}</h3>

            <hr>
            <div>
                <button class="btn btn-success my-5 mx-4" @click="checkout">Checkout</button>
                <button class="btn btn-danger" @click="clearCart">Clear Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import server from '@/api/server.js'
import { setTimeout } from 'timers';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000
});

export default {
    name: 'Cart',
    beforeCreate() {
        this.$store.dispatch('getMyCart')
    },
    created() {
        this.getQuantity()
        this.checkProductsInCart()
    },
    data() {
        return {
            productsToShowInCart: [],
            productsInCart: false,
            cityId: null,
            courier: null,
            loadingGenerateShippingCost: false,
            shippingCostGenerated: false,
            shippingCost: 0, //biaya shipping yang dipilih
            courierValidation: '',
            cityValidation: '',
            serviceOptions: [],
            serviceOptionsGenerated: false,
            serviceChosenByUser: ''
        }
    },
    watch: {
        serviceOptions(v) {
            if (v.length > 0) {
                this.serviceOptionsGenerated = true
            } else {
                this.serviceOptionsGenerated = false
            }
        },
        products(v) {
            this.getQuantity()
            this.checkProductsInCart()
        }
    },
    computed: {
        products() {
            return this.myCart.products
        },
        ...mapState([
            'myCart',
            'cities',
        ])
    },
    methods: {
        getQuantity() {
            let productIds = this.products.map(e => e._id)
            let uniqueProducts = [...new Set(productIds)]  
            uniqueProducts.forEach((e, index) => {
                let objToShow = {
                    _id: e
                }
                
                let count = 0
                objToShow.quantity = this.products.filter(f => f._id === e).length
                let findProductInStore = this.products.find(g => g._id == e)
                objToShow.name = findProductInStore.name
                objToShow.price = findProductInStore.price
                objToShow.image = findProductInStore.image
                uniqueProducts[index] = objToShow
            })
            this.productsToShowInCart = uniqueProducts
        },
        countTotalPrice(q, price) {
            let num = price * q
            return `Rp ${num.toLocaleString()},00`
        },
        checkProductsInCart() {
            if (this.products.length !== 0) {
                this.productsInCart = true
            } else {
                this.productsInCart = false
            }
        },
        handleChange(e) {
            if(e.target.options.selectedIndex > -1) {
                // console.log(e.target.options[e.target.options.selectedIndex].dataset.code)
                this.cityId = e.target.options[e.target.options.selectedIndex].dataset.code
            }
        },
        courierPref(e) {
            if(e.target.options.selectedIndex > -1) {
                // console.log(e.target.options[e.target.options.selectedIndex].dataset.code)
                this.courier = e.target.options[e.target.options.selectedIndex].dataset.courier
            }
        },
        servicePreference(e) {
            if(e.target.options.selectedIndex > -1) {
                this.shippingCost = e.target.options[e.target.options.selectedIndex].dataset.service
            }
        },
        totalPriceInCart() {
            let total = 0
            this.products.forEach(e => {
                total += e.price
            })
            total += +this.shippingCost
            return `Rp ${total.toLocaleString()},00`
        },
        shippingCostCheckToServer() {
            this.serviceOptions = []
            this.cityValidation = ''
            this.courierValidation = ''

            if (!this.cityId || !this.courier) {
                if (!this.cityId) this.cityValidation = `Please select your location`
                if (!this.courier) this.courierValidation = `Please choose courier preference`
            } else {
                this.loadingGenerateShippingCost = true
            }

            server({
                url: `/shipping/cost`,
                method: 'post',
                data: {
                    destination: this.cityId,
                    courier: this.courier
                }
            })
            .then(({data}) => {
                this.serviceOptions = data.rajaongkir.results[0].costs
                this.loadingGenerateShippingCost = false
            })
            .catch(err => {
                setTimeout(() => {
                    this.loadingGenerateShippingCost = false
                    Swal.fire('Sorry the service is not available. Please try another service.')
                }, 100)
                console.log(err)
            })
        },
        currencyConverter(num) {
            return `Rp ${num.toLocaleString()},00`
        },
        clearCart() {
            server({
                url: `/carts`,
                method: 'delete',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.$store.dispatch('getMyCart')
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeOneProduct(id) {
            server({
                url: `/carts/remove-product-from-cart/${id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.$store.dispatch('getMyCart')
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeProducts(id) {
            server({
                url: `/carts/remove-products/${id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.$store.dispatch('getMyCart')
            })
            .catch(err => {
                console.log(err)
            })
        },
        checkout() {
            server({
                url: `/transactions`,
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    total: this.totalPriceInCart()
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: `Transaction has been made`
                })
                this.$store.dispatch('getMyCart')                
                this.$store.dispatch('getAllProducts')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
.prod-img {
    height: auto !important; 
    width: auto !important;
    max-width: 300px !important; 
    max-height: 300px !important;
}
td {
    color: black;
}
</style>
