<template>
    <div class="editor-container">
        <div class="meals">
            <loading :show="data.value.loading">
                <ui-alert v-if="!data.value.mealId"
                          type="error">
                    您还没有搭配套餐, 请
                    <a target="_blank"
                       href="https://smf.taobao.com/index.htm?spm=a1z5d.7629074.1998343221.1.u3IG1O&menu=activity&module=dptc">创建套餐</a>
                    后 <a href="javascript:" @click="refresh">刷新数据</a>
                </ui-alert>

                <div v-if="data.value.mealId" class="form">
                    <ui-tabs fullwidth>
                        <ui-tab header="选择套餐">
                            <div class="form-group">
                                <select v-model="data.value">
                                    <option :value="item" v-for="item in items">{{item.mealName}}</option>
                                </select>
                            </div>
                        </ui-tab>

                        <ui-tab header="排序">
                            <p v-if="!data.value.itemList.length" class="text-center text-muted">
                                没有可排序的套餐宝贝
                            </p>

                            <ul class="goods-items list">
                                <li class="item"
                                    v-for="item in data.value.itemList">
                                    <a href="javascript:"
                                       :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
                                       class="img drag"
                                    ></a>

                                    <div class="desc">
                                        <div class="titles">
                                            <h4>
                                                {{item.title}}
                                            </h4>
                                        </div>

                                        <div>
                                            <div class="promo-price">￥{{item.promoPrice}}
                                            </div>
                                        </div>
                                    </div>

                                    <sort-bar
                                            :items="data.value.itemList"
                                            :item="item">
                                    </sort-bar>
                                </li>
                            </ul>
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
            this.refresh()
        },

        components: {
            sortBar: components.sortBar,
            loading: components.loading
        },

        methods: {
            refresh() {
                api.goods.fetchMeals({cache: false}).then(({items}) => {
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
