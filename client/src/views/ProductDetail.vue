<template>
    <div>
        <SubNavbarAdmin />
        <div class="my-5 container col-7">
            <form @submit.prevent="editProduct">
                <fieldset>
                    <legend>Edit Product Form</legend>
                    <div class="form-group my-4">
                        <label>Product Name</label>
                        <input type="text" class="form-control" placeholder="Enter Product Name" v-model="name">
                        <p style="color: red; font-size: 1em;"><strong>{{nameError}}</strong></p>
                    </div>
                    <div class="form-group my-4">
                        <label>Description</label>
                        <input type="text" class="form-control" placeholder="Enter Product Description" v-model="description">
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="number" class="form-control" placeholder="Price" v-model="price">
                        <p style="color: red; font-size: 1em;"><strong>{{priceError}}</strong></p>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input type="number" class="form-control" placeholder="Stock" v-model="stock">
                        <p style="color: red; font-size: 1em;"><strong>{{stockError}}</strong></p>
                    </div>
                    <img :src="image" alt="">
                    <div class="form-group row my-3" style="margin: 0 auto;">
                        <div style="position:relative; margin: 0 auto;" class="my-3">
                            <a class='btn btn-primary' href='javascript:;' style="border-radius:50px;background-color:#3b3c3f;">
                            Edit Image
                            <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40" @change="getFile">
                            </a>
                            <span class='label label-info' id="upload-file-info"></span>
                            <p style="color: red; font-size: 1em;"><strong>{{imageError}}</strong></p>
                        </div>
                    </div>    
                </fieldset>
                <hr>
                <button type="submit" class="btn btn-primary">Edit Product</button>
            </form>
            <hr>
            <button type="button" class="btn btn-danger" @click="removeProduct">Delete</button>
        </div>        
    </div>
</template>

<script>
import SubNavbarAdmin from '@/components/SubNavbarAdmin.vue'
import server from '@/api/server.js'
import Swal from 'sweetalert2'
import { setTimeout } from 'timers';

export default {
    name: 'ProductDetail',
    created() {
        this.populateData()
    },
    components: {
        SubNavbarAdmin
    },
    data() {
        return {
            name: '',
            price: null,
            description: '',
            stock: null,
            file: '',
            image: '',
            //error message
            nameError: '',
            priceError: '',
            stockError: '',
            imageError: '',
        }
    },
    methods: {
        editProduct() {
            this.nameError = ''
            this.priceError = ''
            this.stockError = ''
            this.imageError = ''

            let productToEdit = new FormData()
            if (this.image.length !== 0) productToEdit.append('image', this.image)
            else if (this.image.file !== 0) productToEdit.append('image', this.file)
            productToEdit.append('name', this.name)
            productToEdit.append('description', this.description)
            productToEdit.append('price', this.price)
            productToEdit.append('stock', this.stock)

            server({
                url: `/products/${this.$route.params.id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: productToEdit
            })
            .then(({data}) => {
                Swal.fire(`${data.msg}`)
                this.$store.dispatch('getAllProducts')
                setTimeout(() => {
                    this.$router.push('/admin/all-products')
                }, 1500)
            })
            .catch(err => {
                let error = ['name', 'image', 'stock', 'price']
                let response = err.response.data.msg.split(', ')
                response.forEach(e => {
                    let spaced = e.toLowerCase().split(' ')
                    error.forEach(err => {
                        let findErr = spaced.find(findIt => findIt === err)
                        if (findErr === 'name') this.nameError = e
                        else if (findErr === 'price') this.priceError = e
                        else if (findErr === 'stock') this.stockError = e
                        else if (findErr === 'image') this.imageError = e
                    })
                })
            })
        },
        populateData() {
            server({
                url: `/products/${this.$route.params.id}`,
                method: 'get',
            })
            .then(({data}) => {
                this.name = data.name
                this.description = data.description
                this.price = data.price
                this.stock = data.stock
                this.image = data.image
            })
            .catch(err => {
                console.log(err)
            })
        },
        getFile(e) {
            this.file = e.target.files[0]
        },
        removeProduct() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
                if (result.value) {
                    this.$store.dispatch('removeProduct', this.$route.params.id)
                }
            })
        }
    }
}
</script>

<style>

</style>
