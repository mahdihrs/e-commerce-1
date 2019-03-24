<template>
<div class="container d-flex flex-wrap my-5">
        <div v-for="item in allProducts" :key="item.id" class="col col-md-4">
            <ItemList :item="item" />
        </div>
    </div>
</template>

<script>
import ItemList from '@/components/ItemCard.vue'
import { mapState } from 'vuex'

export default {
    name: 'Shop',
    components: {
        ItemList
    },
    computed: {
        ...mapState([
            'allProducts'
        ])
    },
    methods: {

    }
}
</script>

<style>

</style>
