<template>
    <div class="module-container">
        <div class="poster-many">
            <div class="ph-empty dashed" v-if="!data.pic.value.length">
                轮播海报
            </div>

            <div v-if="data.pic.value.length">
                <carousel :indicators="true">
                    <carousel-item v-for="item in data.pic.value"
                                   track-by="$index"
                                   class="item">
                        <img :src="item" alt="">
                    </carousel-item>
                </carousel>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Carousel, CarouselItem} from 'vue-m-carousel'
    import {
            fetchGoods,
            posterUrl
    } from '../assets/tools'

    export default {
        props: ['data'],

        components: {
            Carousel,
            CarouselItem
        },

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    pic: {
                        type     : 'pic',
                        title    : '轮播海报',
                        value    : [posterUrl, posterUrl],
                        options  : {
                            max: 6
                        }
                    }
                }
            }
        },
        data() {
            return {}
        }
    }
</script>
