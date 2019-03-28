<template>
    <div class="my-5">
        <h3>Unconfirmed Transactions</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col-7">Total</th>
                    <!-- <th scope="col">Column heading</th> -->
                    <th scope="col">Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in myUnconfirmedTransactions" :key="transaction.id">
                    <td>{{ transaction.price }}</td>
                    <td>{{ transaction.created_at }}</td>
                    <td><button class="btn btn-info" @click="confirmation(transaction._id)">Confirm</button></td>
                </tr>
            </tbody>
        </table>

        <hr>

        <h3 class="my-5">Transaction Histories</h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col-7">Total</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactionHistories" :key="transaction.id">
                    <td>{{ transaction.price }}</td>
                    <td>{{ transaction.created_at }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import server from '@/api/server.js'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000
});

export default {
    name: 'Transactions',
    computed: {
        ...mapState([
            'myUnconfirmedTransactions',
            'transactionHistories'
        ])
    },
    methods: {
        confirmation(id) {
            server({
                url: `/transactions/confirmation/${id}`,
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
                this.$store.dispatch('getUnconfirmedTransaction')
                this.$store.dispatch('getTransactionHistories')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
