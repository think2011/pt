<template>
    <div v-if="!empty">
        <ui-button
                :disabled="page <= 1 || loading"
                @click="doPage(--page)">上一页
        </ui-button>
        <ui-button
                :disabled="page >= pageCount || loading"
                @click="doPage(++page)">下一页
        </ui-button>
        <span>
        {{page}} / {{pageCount}}
        </span>
    </div>
    <div v-if="empty"
         class="text-center">
        <ui-progress-circular
                :show="true"
                :size="80"
                :stroke="2"
        ></ui-progress-circular>
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

        computed: {
            pageCount() {
                return Math.ceil(this.getFields('total') / this.getFields('size'))
            },
            empty() {
                return _.isEmpty(this.data)
            }
        },

        ready() {
            this.doPage(1)
        },

        methods: {
            doPage(page = this.page) {
                this.loading     = true
                this.params.page = page

                this.$http
                        .get(this.url, {params: this.params})
                        .then((res) => {
                            this.data = res.json().data
                            this.$dispatch('on:done', this.data)
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
