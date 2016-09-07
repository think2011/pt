<template>
    <div>
        <div v-if="empty && !loading">
            <ui-alert type="warning"
                      :dismissible="false">
                没有找到数据
            </ui-alert>
        </div>

        <div class="actions" v-if="!empty">
            <ui-button
                    :disabled="page <= 1 || loading"
                    @click="doPage(--page)">上一页
            </ui-button>
            <ui-button
                    :disabled="page >= pageCount || loading"
                    @click="doPage(++page)">下一页
            </ui-button>
            <span class="page-step">
        {{page}} / {{pageCount}}
        </span>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .actions {
        display: flex;
        align-items: center;

        .page-step {
            margin-right: 5px;
        }

        .ui-button {
            margin-right: 5px;
        }
    }

</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            fields : {
                type   : Object,
                default: () => {
                    return {
                        total: 'totalItemCount',
                        size : 'size',
                        items: 'items'
                    }
                }
            },
            url    : {
                type: String
            },
            params : {
                type: Object
            },
            data   : {
                type: Object
            },
            loading: {
                type: Boolean
            },
            cache  : {
                type: Boolean
            }
        },

        computed: {
            pageCount() {
                return Math.ceil(this.getFields('total') / this.getFields('size'))
            },
            empty() {
                return _.isEmpty(this.data.items)
            }
        },

        methods: {
            doPage(page = this.page) {
                this.loading     = true
                this.params.page = this.page = page

                this.$http({
                    url   : this.url,
                    params: this.params,
                    cache : this.cache
                })
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
                page: 1
            }
        }
    }
</script>
