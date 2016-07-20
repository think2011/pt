<template>
    <div>
        <ui-tabs>
            <ui-tab header="宝贝">
                <ul
                        v-sortable="{onUpdate: onUpdate}"
                        class="goods-items list">
                    <li
                            class="item"
                            v-for="item in componentValue.value">

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


                        <div class="actions">
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    type="flat"
                                    v-do-order.up
                                    :do-order-options="{items:componentValue.value,index:$index}"
                                    icon="expand_less">
                            </ui-icon-button>
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    type="flat"
                                    v-do-order.down
                                    :do-order-options="{items:componentValue.value,index:$index}"
                                    icon="expand_more">
                            </ui-icon-button>
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    type="flat"
                                    @click="del(item)"
                                    icon="delete">
                            </ui-icon-button>
                        </div>
                    </li>
                </ul>
            </ui-tab>

            <ui-tab header="属性">
                <ul class="goods-items property">
                    <li
                            class="item"
                            track-by="$index"
                            v-for="item in componentValue.value">

                        <a href="javascript:"
                           :style="{'background-image': 'url('+ item.picUrl +'_sum.jpg)'}"
                           class="img"
                        ></a>

                        <div class="desc">
                            <form>
                                <label v-for="labelItem in componentValue.options.labels">
                                    <span class="label">{{labelMap[labelItem]}}</span>
                                    <input type="text" v-model="item[labelItem]">
                                </label>
                            </form>
                        </div>
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>


        <select-goods
                @on:ok="selectGoodsOk"
                :init-items="componentValue.value"
                :max-len="componentValue.options.maxLen"
                :min-len="componentValue.options.minLen"
                :show.sync="showSelectGoods">
        </select-goods>


        <div class="text-center">
            <ui-button
                    color="primary"
                    icon="add"
                    @click="showSelectGoods = true">
                添加宝贝 {{componentValue.value.length}}/{{componentValue.options.maxLen}}
            </ui-button>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .goods-items {
        .item {
            margin: 0 0 5px 0;
            border: none;

            .img {
                width: 80px;
                height: 80px;
                flex: 0 0 80px;
                margin-right: 15px;
            }

            .desc {
                flex: 1;
                margin: 0;

                form {
                    display: flex;
                    flex-direction: column;

                    label {
                        font-size: 14px;

                        .label {
                            width: 60px;
                            display: inline-block;
                        }
                    }
                }
            }

            .titles {

                h4 {
                }

                h5 {
                }
            }

            .actions {
                .promo-price {
                    .price {
                    }
                }

                .sold {
                }

                .btn {
                }
            }

        }
    }

    .goods-items.list {
        .item {
            cursor: move;
            position: relative;

            &:not(:last-child) {
                border-bottom: 1px dashed #eee;
                padding-bottom: 5px;
                margin-bottom: 10px;
            }

            .actions {
                display: none;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                align-items: flex-end;
                justify-content: flex-end;
                background: rgba(0, 0, 0, 0.1);
                padding: 5px;

                button {
                    margin: 0 3px;
                }
            }

            &:hover {
                .actions {
                    display: flex;
                }
            }
        }
    }

    .goods-items.property {
        .item {
            &:not(:last-child) {
                border-bottom: 1px dashed #eee;
                padding-bottom: 5px;
                margin-bottom: 10px;
            }

        }
        form {
            label {
                margin-bottom: 5px;
                display: flex;

                .label {
                    align-self: center;
                }

                input {
                    flex: 1;
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import api from '../api'
    import tabs from '../components/tabs.vue'
    import tab from '../components/tab.vue'
    import selectGoods from '../components/select-goods.vue'

    export default{
        props: {
            componentValue: {
                type: Object
            }
        },

        components: {
            tabs,
            tab,
            selectGoods
        },

        methods: {
            del (item) {
                if (this.componentValue.value.length <= this.componentValue.options.minLen) {
                    return alert(`至少要留${this.componentValue.options.minLen}个宝贝`)
                }

                this.componentValue.value.$remove(item)
            },
            onUpdate (event) {
                this.componentValue.value.splice(event.newIndex, 0, this.componentValue.value.splice(event.oldIndex, 1)[0])
            },
            selectGoodsOk(items) {
                this.componentValue.value = items
            }
        },

        data(){
            return {
                labelMap       : {
                    title       : '标题',
                    subTitle    : '子标题',
                    soldQuantity: '销量'
                },
                showSelectGoods: false
            }
        }
    }
</script>
