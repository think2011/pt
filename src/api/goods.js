module.exports = function (http) {
    return {
        /**
         * 获取宝贝列表
         * @param args
         * @returns {*}
         */
        list(...args) {
            let options = _.assign({
                params: {
                    type: 'Keyword',
                    q   : ''
                }
            }, args)

            return http
                .get('/api/taobao/items', options)
                .then((res) => res.json().data)
        },


        /**
         * 获取主图
         * @param ids
         */
        fetchMainPic(ids) {
            return http
                .get('/api/taobao/multi-items', {
                    params: {
                        itemIds: ids.join(',')
                    }
                })
                .then((res) => res.json().data)
        },

        /**
         * 获取分类
         */
        categories() {
            return http
                .get('/api/taobao/seller-cats')
                .then((res) => res.json().data)
                .then(function ({items}) {
                    items.forEach(function (v) {
                        v._level = v.parentCid === 0 ? 1 : 2;
                    });

                    items[0].name   = '全部分类'
                    items[0]._level = 1

                    return items;
                }).then(function (items) {
                    // 标记是否有子目录
                    var parentCids = items.map(function (v) {
                        return v.parentCid;
                    });

                    items.forEach(function (v) {
                        v._hasChildren = parentCids.indexOf(v.cid) !== -1;
                    });

                    return items;
                })

        },

        /**
         * 搭配套餐
         */
        fetchMeals(options = {}) {

            return http({
                url   : '/api/taobao/seller-meals',
                params: {
                    isValid: true
                },
                cache : options.cache
            })
                .then((res) => res.json().data)
        },

        /**
         * 优惠券
         */
        fetchCoupons(options = {}) {

            return http({
                url   : '/api/wirelesspages/coupons',
                params: {},
                cache : options.cache
            })
                .then((res) => res.json().data)
                .then((res) => {
                    let items = res.items

                    _.each(items, (value) => {
                        let noLimit = value.condition - value.denominations === 1

                        value._condition     = noLimit ? '无条件使用' : `满${value.condition / 100}元可用`
                        value._denominations = value.denominations / 100
                    })

                    return res
                })
        }
    }
}
