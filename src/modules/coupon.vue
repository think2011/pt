<template>
    <div class="module-container">
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
                this.data = {}
            }
        },
        data() {
            return {}
        }
    }
</script>
