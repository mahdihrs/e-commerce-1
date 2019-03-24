<template>
    <div class="mb-5">
        <div id="carouselExampleIndicators" class="carousel slide carousel-homepage col-12 mt-1" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="650px" class="d-block w-100" alt="carousel1">
                </div>
                <div class="carousel-item">
                <img src="https://cdn.vox-cdn.com/thumbor/GSahnzE5KptBvffpYpA_RKK1lTY=/0x0:761x1000/1200x800/filters:focal(305x696:425x816)/cdn.vox-cdn.com/uploads/chorus_image/image/51899595/Want_Les_Essentiels_AW16_Women_Footwear_Editorial_09.0.jpeg" height="650px" class="d-block w-100" alt="carousel2">
                </div>
                <div class="carousel-item">
                <img src="https://static.highsnobiety.com/wp-content/uploads/2016/04/07214642/want-les-essentiels-fw-16-lookbook-00.jpg" height="650px" class="d-block w-100" alt="carousel3">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        <div class="container my-5">
            <div class="row justify-content-between">
                <ItemCard :item="cardItem1" class="" />
                <ItemCard :item="cardItem2" class=""/>
                <ItemCard :item="cardItem3" class=""/>
            </div>
        </div>

        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue'
import Footer from '@/components/FooterHomepage.vue'

export default {
    name: 'homepage-content',
    data() {
        return {
            cardItem1: {
                name: 'Travel Bag',
                image: 'https://shop.r10s.jp/branding/cabinet/22/b7722_1.jpg',
                description: 'With its sleek lines and elegant silhouette, the updated Maxi Valencia elevates the classic Valencia. Its new top handle and structured frame carry your daily essentials, all while presenting a modern and chic style.',
                price: 1250000,
                stock: 3
            },
            cardItem2: {
                name: 'Canvas Bag',
                image: 'https://shop.r10s.jp/branding02/cabinet/12/b6612_1.jpg',
                description: 'The Wellington boot presents a new rendition on the classic chelsea boot - updated slightly with a thick tread-sole and gommato leather toe mud-guard. This iconic style is made with supple yet durable premium Italian leather and with high performance construction that guarantees a comfortable fit. ',
                price: 1250000,
                stock: 3                
            },
            cardItem3: {
                name: 'Leather Shoes',
                image: 'https://img-static.tradesy.com/item/23275001/want-les-essentiels-burgundy-cordova-oxford-formal-shoes-size-us-7-regular-m-b-0-0-300-300.jpg',
                description: 'An attention-grabbing folio with a sleek form, the Barajas effortlessly stores your phone, wallet, and accessories. Now available in a pared-down single zip format, it can easily fit daily essentials alongside an iPad or notebook. Worn tucked under an arm or carried with the detachable wristlet, the Barajas proves its versatility through its classic, yet still modern design.',
                price: 1250000,
                stock: 3                
            }
        }
    },
    components: {
        ItemCard,
        Footer
    }
}
</script>

<style>

</style>
