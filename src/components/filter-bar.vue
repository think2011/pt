<template>
    <div class="filter-bar">
        <div>
            <a v-el:categories class="link-trigger">{{categoriesData.name}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.categories"
                     :options="categories"
                     @option-selected="selectCategory"
                     :contain-focus="false"
            ></ui-menu>
        </div>

        <div>
            <a v-el:is-sale class="link-trigger">{{isSaleData.text}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.isSale"
                     :options="isSaleOpts"
                     open-on="hover"
                     @option-selected="selectIsSale"
                     :contain-focus="false"
            ></ui-menu>
        </div>

        <div class="sort"
             :class="{active: sortData === item}"
             v-for="item in sortOpts">
            <a
                    @click="selectSort(item)"
                    href="javascript:">
                {{item.text}}
                <i class="material-icons ui-icon">
                    {{item.desc ? 'arrow_upward' : 'arrow_downward'}}
                </i>
            </a>
        </div>

        <div class="search">
            <ui-select
                    :options="searchOpts"
                    name="searchOpts"
                    :value.sync="searchData"
            ></ui-select>
            <ui-textbox
                    name="q"
                    type="search"
                    :value.sync="q"
                    @keyup.enter="search"
                    placeholder="请输入搜索内容">
            </ui-textbox>
            <ui-button @click="search">搜索</ui-button>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .filter-bar {
        width: 100%;
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        > div {
            margin-right: 3px;
        }

        .sort {
            &.active {
                a {
                    color: #2196F3;
                }
            }

            a {
                color: #999;
            }

            i {
                font-size: 24px;
            }
        }

        .ui-select, .ui-textbox {
            margin: 0;
        }

        .ui-textbox {
            align-self: flex-end;
        }

        .search {
            display: flex;
            margin-left: auto;

            .ui-button {
                height: 32px;
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import api from '../api'

    export default{
        props: {
            params: {
                type: Object
            }
        },

        methods: {
            selectCategory(value) {
                this.categoriesData = value
                this.updateParams()

                return false
            },
            selectIsSale(value) {
                this.isSaleData = value

                return false
            },
            selectSort(item) {
                if (this.sortData === item) {
                    item.desc = !item.desc
                }

                this.sortData = item
            },
            updateParams() {
                let params = {
                    sellerCids: this.categoriesData.cid === 0 ? '' : this.categoriesData.cid,
                    type      : this.searchData.value,
                    itemState : this.isSaleData.value,
                    orderBy   : `${this.sortData.value}:${this.sortData.desc ? 'desc' : 'asc'}`,
                    q         : this.q
                }

                this.$dispatch('params-change', params)
                this.params = params
            },
            search() {
                this.updateParams()
            }
        },

        watch: {
            'searchData+isSaleData+sortData+sortData.desc': {
                handler: function () {
                    if (!this.searchData) return

                    this.updateParams()
                },
                deep   : true
            }
        },

        ready () {
            api.goods.categories()
                    .then((items) => {
                        _.each(items, (item) => {
                            item.text = item._level === 2 ? `　${item.name}` : item.name

                            this.categories.push(item)
                        })

                        this.categoriesData = this.categories[0]
                    })

            this.searchData = this.searchOpts[0]
            this.isSaleData = this.isSaleOpts[0]
            this.sortData   = this.sortOpts[0]
        },

        data(){
            return {
                categories    : [],
                sortOpts      : [
                    {
                        text : '上下架时间',
                        value: 'list_time',
                        desc : true
                    },
                    {
                        text : '销量',
                        value: 'sold_quantity',
                        desc : false
                    },
                    {
                        text : '库存',
                        value: 'num',
                        desc : false
                    }
                ],
                isSaleOpts    : [
                    {
                        value: 'OnSale',
                        text : '出售中的宝贝'
                    },
                    {
                        value: 'InStore',
                        text : '仓库中的宝贝'
                    }
                ],
                searchOpts    : [
                    {
                        value: 'Keyword',
                        text : '关键字'
                    },
                    {
                        value: 'OuterId',
                        text : '商家编码'
                    },
                    {
                        value: 'ItemUrl',
                        text : '宝贝链接'
                    }
                ],
                searchData    : {},
                isSaleData    : {},
                sortData      : {},
                categoriesData: {},
                q             : ''
            }
        }
    }
</script>
