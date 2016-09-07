<template>
    <div v-if="type === 'goods'" class="filter-bar">
        <div>
            <a v-el:categories class="link-trigger">{{goodsType.categoriesData.name}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.categories"
                     :options="goodsType.categories"
                     open-on="hover"
                     @option-selected="selectCategory"
                     :contain-focus="false"
            ></ui-menu>
        </div>

        <div>
            <a v-el:is-sale class="link-trigger">{{goodsType.isSaleData.text}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.isSale"
                     :options="goodsType.isSaleOpts"
                     open-on="hover"
                     @option-selected="selectIsSale"
                     :contain-focus="false"
            ></ui-menu>
        </div>

        <div class="sort"
             :class="{active: goodsType.sortData === item}"
             v-for="item in goodsType.sortOpts">
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
                    :options="goodsType.searchOpts"
                    name="searchOpts"
                    :value.sync="goodsType.searchData"
            ></ui-select>
            <ui-textbox
                    name="q"
                    type="search"
                    :value.sync="goodsType.q"
                    @keyup.enter="search"
                    placeholder="请输入搜索内容">
            </ui-textbox>
            <ui-button @click="search">搜索</ui-button>
        </div>
    </div>

    <div v-if="type === 'pic'" class="filter-bar">
        <div>
            <a v-el:categories class="link-trigger">{{picType.categoriesData.text}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.categories"
                     :options="picType.categories"
                     open-on="hover"
                     @option-selected="selectCategory"
                     :contain-focus="false"
            ></ui-menu>
        </div>
        <div>
            <a v-el:sort class="link-trigger">{{picType.sortData.text}}<i
                    class="material-icons ui-icon">arrow_drop_down</i></a>
            <ui-menu :trigger="$els.sort"
                     :options="picType.sortOpts"
                     open-on="hover"
                     @option-selected="selectSort"
                     :contain-focus="false"
            ></ui-menu>
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
            },
            type  : {
                type   : String,
                default: () => 'goods'
            }
        },

        methods: {
            selectCategory(value) {
                let type = this.type === 'goods' ? 'goodsType' : 'picType'

                this[type].categoriesData = value
                this.updateParams()

                return false
            },
            selectIsSale(value) {
                this.goodsType.isSaleData = value

                return false
            },
            selectSort(item) {
                switch (this.type) {
                    case 'goods':
                        if (this.goodsType.sortData === item) {
                            item.desc = !item.desc
                        }

                        this.goodsType.sortData = item
                        this.updateParams()
                        break;

                    case 'pic':
                        this.picType.sortData = item
                        this.updateParams()
                        return false
                        break;

                    default:
                        //
                }

            },
            updateParams() {
                let params = {}

                switch (this.type) {
                    case 'goods':
                        let goodsType = this.goodsType
                        params        = {
                            sellerCids: goodsType.categoriesData.cid === 0 ? '' : goodsType.categoriesData.cid,
                            type      : goodsType.searchData.value,
                            itemState : goodsType.isSaleData.value,
                            orderBy   : `${goodsType.sortData.value}:${goodsType.sortData.desc ? 'desc' : 'asc'}`,
                            q         : goodsType.q
                        }
                        break;

                    case 'pic':
                        let picType = this.picType

                        params = {
                            pictureCategoryId: picType.categoriesData.id,
                            orderBy          : `${picType.sortData.value}:${picType.sortData.sort}`
                        }
                        break;

                    default:
                        //
                }

                this.$dispatch('params-change', params)
                this.params = params
            },
            search() {
                this.updateParams()
            }
        },

        watch: {
            'goodsType + picType': {
                handler: function () {
                    if (!window.event) return

                    this.updateParams()
                },
                deep   : true
            },
        },

        ready () {
            switch (this.type) {
                case 'goods':
                    let goodsType = this.goodsType

                    api.goods.categories()
                            .then((items) => {
                                _.each(items, (item) => {
                                    item.text = item._level === 2 ? `　${item.name}` : item.name

                                    goodsType.categories.push(item)
                                })

                                goodsType.categoriesData = goodsType.categories[0]
                            })

                    goodsType.searchData = goodsType.searchOpts[0]
                    goodsType.isSaleData = goodsType.isSaleOpts[0]
                    goodsType.sortData   = goodsType.sortOpts[0]
                    break;

                case 'pic':
                    let picType = this.picType

                    api.pic.categories()
                            .then(({items}) => {
                                picType.categories = _.map(items, (item) => {
                                    return {
                                        id  : item.pictureCategoryId,
                                        text: item.pictureCategoryName
                                    }
                                })

                                picType.categoriesData = picType.categories[0]
                                this.updateParams()
                            })


                    picType.sortData = picType.sortOpts[0]
                    break;

                default:
                    //
            }
        },

        data(){
            return {
                goodsType: {
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
                },
                picType  : {
                    categories    : [],
                    categoriesData: {},
                    sortOpts      : [
                        {
                            text : '按上传时间从晚到早',
                            value: 'time',
                            sort : 'desc'
                        },
                        {
                            text : '按上传时间从早到晚',
                            value: 'time',
                            sort : 'asc'
                        },
                        {
                            text : '按图片从大到小',
                            value: 'size',
                            sort : 'desc'
                        },
                        {
                            text : '按图片从小到大',
                            value: 'size',
                            sort : 'asc'
                        },
                    ],
                    sortData      : {}
                }
            }
        }
    }
</script>