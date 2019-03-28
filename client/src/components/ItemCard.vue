<template>
    <div class="mx-3">
        <div class="card bg-light mb-3 card-for-item pointtoit" style="max-width: 20rem;" @click="getProductDetail(item._id)">
            <div class="card-header">{{ item.name }}</div>
            <div class="card-body">
                <img v-if="item.image" :src="item.image" alt="" class="item-card my-3 img-fluid">
                <img v-else src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2012%2F01%2Fwant-les-essentiels-de-la-vie-o039hare-shopper-tote-1.jpg" class="item-card my-3 img-fluid" alt="item-picture">
                <h4 class="card-title">{{ item.name }}</h4>
                <p v-if="item.price" class="card-text desc-item mb-0">{{ currencyConverter(item.price) }}</p>
                <p class="card-text desc-item">Stock:{{ stockInterface(item.stock) }}</p>
                <!-- <p class="card-text desc-item">{{ item.description }}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ItemCard',    
    props: ['item'],
    computed: {
        ...mapState([
            'isAdmin'
        ])
    },
    methods: {
        getProductDetail(id) {
            if (this.isAdmin) {
                this.$router.push(`/admin/p/detail/${id}`)
            } else {
                this.$router.push(`/shop/item-detail/${id}`)
            }
        },
        currencyConverter(num) {
            return `Rp ${num.toLocaleString()},00`
        },
        stockInterface(num) {
            if (num <= 1) {
                return `${num} pc`
            } else {
                return `${num} pcs`
            }
        },
    }
}
</script>

<style>
.item-card {
    max-height: 250px !important;
    height: 225px !important;
    width: 250px !important;
}
.card-for-item {
    height: 500px;
}
.desc-item {
    max-height: 120px;
    overflow-y: auto;
}
.card-header {
    background-color: rgb(210, 210, 210);
    max-height: 45;
}
.pointtoit {
    cursor: pointer;
}
</style>
