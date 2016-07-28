<template>
    <div class="other-poster">
        <div class="ph-empty dashed" v-if="!componentData.pic.value">
            单张海报
        </div>

        <div v-if="componentData.pic.value">
            <img  :src="componentData.pic.value" alt="">
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    /* !!因为移动端,必须使用 rem 单位!! */
    @import "../assets/lib/hotcss.scss";

    .other-poster {
        img {
            width: 100%;
            display: block;
        }
    }

</style>

<script type="text/ecmascript-6">
    import {
            fetchGoods
    } from '../assets/tools'

    export default {
        props: ['componentData'],

        created() {
            if (_.isEmpty(this.componentData)) {
                this.componentData = {
                    pic: {
                        type     : 'pic',
                        title    : '海报',
                        isDefault: true,
                        value    : 'https://img.alicdn.com/imgextra/i3/92779311/TB2uGl0nXXXXXbxXpXXXXXXXXXX-92779311.jpg',
                    }
                }
            }
        },
        data() {
            return {}
        }
    }
</script>
