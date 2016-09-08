<template>
    <div class="editor-container form">
        <loading :show="data.value.loading">
            <ui-alert v-if="!data.value.couponId"
                      type="error">
                您还没有优惠券, 请
                <a target="_blank"
                   href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343224.1.OGHeRm&menu=yhkq&module=yhkq">创建优惠券</a>
                后 <a href="javascript:" @click="refresh">刷新数据</a>
            </ui-alert>

            <div v-if="data.value.couponId" class="form-group">
                <label>{{data.title}}</label>

                <select v-model="data.value">
                    <option :value="item" v-for="item in items">
                        {{item._denominations}}元 ({{item._condition}})
                    </option>
                </select>
            </div>
        </loading>
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
            this.refresh()
        },

        components: {
            loading: components.loading
        },

        methods: {
            refresh() {
                api.goods.fetchCoupons({cache: false}).then(({items}) => {
                    this.$set('items', items)
                    this.$set('data.value', items[0] || {})
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
