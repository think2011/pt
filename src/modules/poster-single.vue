<template>
    <div class="module-container">
        <div class="poster-single">
            <div class="ph-empty dashed" v-if="!data.pic.value.length">
                单张海报
            </div>

            <div v-if="data.pic.value">
                <img :src="data.pic.value[0]" alt="">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
            fetchGoods,
            posterUrl
    } from '../assets/tools'

    export default {
        props: ['data'],

        created() {
            if (_.isEmpty(this.data)) {
                this.data = {
                    pic: {
                        type   : 'pic',
                        title  : '海报',
                        value  : [posterUrl],
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
