<template>
    <div class="editor-container">
        <div class="panel editor-goods">
            <div class="actions">
                <ui-button
                        v-show="data.value.length"
                        @click="editMode = !editMode"
                        :color="editMode ? 'warning' : 'default'">
                    <i class="material-icons">edit</i>
                </ui-button>
                <ui-button
                        @click="showSelectGoods = true"
                        color="default"
                        type="flat">
                    <i class="material-icons">add</i>
                </ui-button>
            </div>
            <div class="title">宝贝</div>
            <div class="body">
                <div class="text-center text-muted m-t-20 m-b-20" v-if="!data.value.length">
                    未选择任何宝贝, <a @click="showSelectGoods = true" href="javascript:">请添加宝贝</a>
                </div>

                <!-- 展示模式 -->
                <ul v-if="!editMode" class="goods-items list">
                    <li class="item"
                        v-for="item in data.value">
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
                                :items="data.value"
                                :item="item">
                        </sort-bar>
                    </li>
                </ul>

                <!-- 编辑模式 -->
                <ul v-if="editMode" class="goods-items list">
                    <li class="item"
                        v-for="item in data.value">
                        <a href="javascript:"
                           :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
                           class="img drag"
                        ></a>

                        <div class="form">
                            <ui-textbox v-for="labelItem in data.options.labels"
                                        :value.sync="item[labelItem]"
                                        :label="labelMap[labelItem]"
                                        :placeholder="labelMap[labelItem]"
                                        :name="labelItem"
                                        type="text"
                            ></ui-textbox>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <select-goods
                @on:ok="selectGoodsOk"
                :init-items="data.value"
                :max-len="data.options.maxLen"
                :min-len="data.options.minLen"
                :show.sync="showSelectGoods">
        </select-goods>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<script type="text/ecmascript-6">
    import api from '../api'
    import tabs from '../components/tabs.vue'
    import tab from '../components/tab.vue'
    import selectGoods from '../components/select-goods.vue'
    import sortBar from '../components/sort-bar.vue'

    export default{
        props: {
            data: {
                type: Object
            }
        },

        components: {
            tabs,
            tab,
            selectGoods,
            sortBar
        },

        methods: {
            del (item) {
                if (this.data.value.length <= this.data.options.minLen) {
                    return alert(`至少要留${this.data.options.minLen}个宝贝`)
                }

                this.data.value.$remove(item)
            },
            onUpdate (event) {
                this.data.value.splice(event.newIndex, 0, this.data.value.splice(event.oldIndex, 1)[0])
            },
            selectGoodsOk(items) {
                this.data.value = items
            }
        },

        data(){
            return {
                labelMap       : {
                    title       : '标题',
                    subTitle    : '子标题',
                    soldQuantity: '销量',
                    price       : '原价',
                },
                editMode       : false,
                showSelectGoods: false
            }
        }
    }
</script>
