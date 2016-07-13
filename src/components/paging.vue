<template>
    <div v-if="data">
        <button
                :disabled="page <= 1 || loading"
                @click="doPage(page--)">上一页
        </button>
        <button
                :disabled="page >= pageCount || loading"
                @click="doPage(page++)">下一页
        </button>
        <span>
        {{page}} / {{pageCount}}
        </span>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            fields: {
                type   : Object,
                default: () => {
                    return {
                        total: 'totalItemCount',
                        size : 'size',
                        items: 'items'
                    }
                }
            },
            url   : {
                type: String
            },
            params: {
                type: Object
            },
            data  : {
                type: Object
            }
        },

        ready() {
            this.doPage(1)
        },

        computed: {
            pageCount() {
                return Math.ceil(this.getFields('total') / this.getFields('size'))
            }
        },

        methods: {
            doPage(page) {
                this.loading     = true
                this.params.page = this.page

                this.$http
                        .get(this.url, {params: this.params})
                        .then((res) => {
                            this.data = res.json().data
                        })
                        .finally(() => {
                            this.loading = false
                        })
            },
            getFields(field) {
                return this.data[this.fields[field]]
            }
        },

        data(){
            return {
                loading: false,
                page   : 1
            }
        }
    }
</script>
