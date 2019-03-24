<template>
    <div class="d-flex justify-content-center my-5">
        <router-link class="mx-3 sub-navbar" to="/admin/add-product">Add Product</router-link>
        <router-link class="mx-3 sub-navbar" to="/admin/all-products">See Products</router-link>
        <router-link class="sub-navbar" to="/admin/transactions">Transactions</router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .sub-navbar {
        font-weight: bold;
        font-size: 1.5em;
    }
</style>
