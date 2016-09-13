<template>
    <div class="editor-container ">
        <div class="coupons">
            <loading :show="data.value.loading">
                <ui-alert v-if="!items.length"
                          type="error">
                    您还没有优惠券, 请
                    <a target="_blank"
                       href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.OGHeRm&menu=yhkq&module=yhkq">创建优惠券</a>
                    后 <a href="javascript:" @click="refresh">刷新数据</a>
                </ui-alert>

                <div v-if="items.length">
                    <ui-tabs fullwidth>
                        <ui-tab header="选择优惠券">
                            <box-select :value.sync="data.value">
                                <box-select-option v-for="item in items" :option="item">
                                    {{item._denominations}}元 ({{item._condition}})
                                </box-select-option>
                            </box-select>
                        </ui-tab>

                        <ui-tab header="排序">
                            <p v-if="!data.value.length" class="text-center text-muted">
                                没有可排序的优惠券
                            </p>

                            <div class="sort" v-for="item in data.value" track-by="$index">
                                <div class="desc">
                                    {{item._denominations}}元 ({{item._condition}})
                                </div>
                                <sort-bar
                                        :items="data.value"
                                        :item="item">
                                </sort-bar>
                            </div>
                        </ui-tab>
                    </ui-tabs>
                </div>
            </loading>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import components from '../components'
    import api from '../api'

    export default{
        props: {
            data: {
                type: Object
            }
        },

        created() {
            this.refresh(true)
        },

        components: {
            sortBar        : components.sortBar,
            boxSelect      : components.boxSelect,
            boxSelectOption: components.boxSelectOption,
            loading        : components.loading
        },

        methods: {
            refresh(cache = false) {
                api.goods.fetchCoupons({cache: cache}).then(({items}) => {
                    this.$set('items', items)
                })
            }
        },

        data(){
            return {
                items: [],
            }
        }
    }
</script>
