<template>
    <div>
        <SubNavbarAdmin />
        <div class="my-5 container col-7">
            <form @submit.prevent="addproduct">
                <fieldset>
                    <legend>Add Product Form</legend>
                    <div class="form-group my-4">
                        <label>Product Name</label>
                        <input type="text" class="form-control" placeholder="Enter Product Name" v-model="name">
                        <p style="color: red; font-size: 1em;"><strong>{{nameError}}</strong></p>
                    </div>
                    <div class="form-group my-4">
                        <label>Description</label>
                        <input type="text" class="form-control" placeholder="Enter Product Description" v-model="description">
                        <p style="color: red; font-size: 1em;"><strong>{{nameError}}</strong></p>
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
                    <div class="form-group row my-3" style="margin: 0 auto;">
                        <!-- <label class="col-sm-2 col-form-label">Image</label> <br> -->
                        <div style="position:relative; margin: 0 auto;" class="my-3">
                            <a class='btn btn-primary' href='javascript:;'>
                            Add Image
                            <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40" @change="getFile">
                            </a>
                            <span class='label label-info' id="upload-file-info"></span>
                            <p style="color: red; font-size: 1em;"><strong>{{imageError}}</strong></p>
                        </div>
                    </div>    
                </fieldset>
                <hr>
                <button type="submit" class="btn btn-primary">Add Product</button>
            </form>
        </div>
    </div>
</template>

<script>
import SubNavbarAdmin from '@/components/SubNavbarAdmin.vue'
import server from '@/api/server.js'
import Swal from 'sweetalert2'
import { setTimeout } from 'timers';

export default {
    name: 'AddProduct',
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
        addproduct() {
            this.nameError = ''
            this.priceError = ''
            this.stockError = ''
            this.imageError = ''

            let productToAdd = new FormData()
            productToAdd.append('image', this.file)
            productToAdd.append('name', this.name)
            productToAdd.append('description', this.description)
            productToAdd.append('price', this.price)
            productToAdd.append('stock', this.stock)

            server({
                url: '/products',
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: productToAdd
            })
            .then(({data}) => {
                Swal.fire('New product has been added')
                this.$store.dispatch('getAllProducts')
                setTimeout(() => {
                    this.$router.push('/admin/all-products')
                }, 1500)
                this.name = ''
                this.price = 0
                this.stock = 0
                this.image = ''
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
        getFile(e) {
            this.file = e.target.files[0]
        }
    }
}
</script>

<style>

</style>
