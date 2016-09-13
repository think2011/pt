<template>
    <div class="module-container">
        <div class="poster-single">
            <div class="ph-empty dashed" v-if="!data.pic.value[0].picUrl">
                单张海报
            </div>

            <div v-if="data.pic.value[0].picUrl">
                <a :href="data.pic.value[0].url"
                   class="img">
                    <img :src="data.pic.value[0].picUrl" alt="">
                </a>

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
            fetchGoods,
            posterUrls
    } from '../assets/tools'

    export default {
        props: ['data'],

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    pic: {
                        type   : 'pic',
                        title  : '单张海报',
                        value  : [{
                            url   : null,
                            picUrl: posterUrls[1]
                        }],
                        options: {
                            max: 1
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
