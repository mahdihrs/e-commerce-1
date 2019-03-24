<template>
    <div>
        <SubNavbarAdmin />
        <div class="container d-flex flex-wrap">
            <div class="col col-md-4" v-for="product in allProducts" :key="product.id">
                <ItemCard :item="product"/>
            </div>
        </div>
    </div>
</template>

<script>
import SubNavbarAdmin from '@/components/SubNavbarAdmin.vue'
import ItemCard from '@/components/ItemCard.vue'
import { mapState } from 'vuex'

export default {
    name: 'ProductList',
    components: {
        ItemCard,
        SubNavbarAdmin
    },
    computed: {
        ...mapState([
            'allProducts'
        ])
    },
}
</script>

<style>

</style>
