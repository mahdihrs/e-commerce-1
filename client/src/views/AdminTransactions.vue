<template>
    <div class="my-5">
        <SubNavbarAdmin />

        <h3>Unconfirmed Transactions</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col-7">Total</th>
                    <!-- <th scope="col">Column heading</th> -->
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in unconfirmedTransactionsForAdmin" :key="transaction.id">
                    <td>{{ transaction.user }}</td>
                    <td>{{ transaction.price }}</td>
                    <td>{{ transaction.created_at }}</td>
                </tr>
            </tbody>
        </table>

        <hr>

        <h3 class="my-5">Transaction Histories</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col-7">Total</th>
                    <!-- <th scope="col">Column heading</th> -->
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactionHistoriesForAdmin" :key="transaction.id">
                    <td>{{ transaction.user }}</td>
                    <td>{{ transaction.price }}</td>
                    <td>{{ transaction.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import SubNavbarAdmin from '@/components/SubNavbarAdmin.vue'

export default {
    name: 'AdminTransactions',
    components: {
        SubNavbarAdmin
    },
    computed: {
        ...mapState([
            'unconfirmedTransactionsForAdmin',
            'transactionHistoriesForAdmin'
        ])
    }
}
</script>

<style>

</style>
