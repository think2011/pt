<template>
    <div class="module-container">
        <div class="poster poster-singe">
            <div class="ph-empty dashed" v-if="!data.pic.value">
                单张海报
            </div>

            <div v-if="data.pic.value">
                <img :src="data.pic.value" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    @import "../assets/lib/hotcss.scss";

    .poster-singe {
        img {
            width: 100%;
            display: block;
        }
    }
</style>

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
                        type     : 'pic',
                        title    : '海报',
                        isDefault: true,
                        value    : posterUrl,
                    }
                }
            }
        },
        data() {
            return {}
        }
    }
</script>
