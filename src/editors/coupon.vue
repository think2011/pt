<template>
    <div class="editor-container ">
        <div class="coupons">
            <loading :show="data.value.loading">
                <ui-alert v-if="!items.length"
                          type="error">
                    您还没有优惠券, 请
                    <a target="_blank"
                       href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.OGHeRm&menu=yhkq&module=yhkq">创建优惠券</a>
                    后 <a href="javascript:" @click="refresh()">刷新数据</a>
                </ui-alert>

                <div v-if="items.length">
                    <ui-tabs fullwidth>
                        <ui-tab header="选择优惠券">
                            <ui-alert type="error">
                                请选择
                                <a target="_blank"
                                   href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.OGHeRm&menu=yhkq&module=yhkq">
                                    开放推广
                                    <img src="http://img.alicdn.com/imgextra/i4/2979432856/TB2lG4hXgfC11BjSszcXXc44pXa_!!2979432856.jpg">
                                </a>
                                的优惠券, 否则无法领取
                            </ui-alert>

                            <box-select :value.sync="data.value">
                                <box-select-option
                                        title="可用时间:{{item.creatTime}} - {{item.endTime}}"
                                        v-for="item in items"
                                        track-by="couponId"
                                        :option="item">
                                    {{item._denominations}}元 ({{item._condition}})
                                </box-select-option>
                            </box-select>

                            <div class="text-right">
                                <a href="javascript:" @click="refresh()">刷新数据</a>
                            </div>
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
            loading        : components.loading,
        },

        methods: {
            refresh(cache = false) {
                api.goods.fetchCoupons({cache: cache}).then(({items}) => {
                    let diffItems = _.filter(items, (item) => {
                        return !_.some(this.items, (dataItem) => dataItem.couponId === item.couponId)
                    })

                    this.$set('items', this.items.concat(diffItems))
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
