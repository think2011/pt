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

            // TODO ZH 16/8/25
            return new Promise((resolve, reject) => {
                resolve({
                    "pageCount"     : 1,
                    "page"          : 1,
                    "size"          : 10,
                    "items"         : [{
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-25 21:09",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-08-18 21:09",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523285528885,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i1/TB1OXmDKXXXXXaNXFXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "19998.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "【促销宝】【促销常见问题】如何快速删除宝贝的促销价格？",
                        "type"         : "fixed",
                        "promoPrice"   : "19998.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523285528885"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-26 20:25",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-08-19 20:25",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523284328038,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1fOiNKXXXXXbcXpXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "39996.00",
                        "sellerCids"   : ",1117119980,",
                        "soldQuantity" : 0,
                        "title"        : "【促销宝】如何修改已经创建好的促销活动？",
                        "type"         : "fixed",
                        "promoPrice"   : "39996.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523284328038"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-30 20:15",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-08-23 20:15",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523276134105,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1_OSCKXXXXXXmXVXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "39996.00",
                        "sellerCids"   : ",1117119980,",
                        "soldQuantity" : 0,
                        "title"        : "【促销宝】如何取消促销活动？",
                        "type"         : "fixed",
                        "promoPrice"   : "39996.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523276134105"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-31 20:26",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-08-24 20:26",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523275294577,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i2/TB1PheFKXXXXXaKXFXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "39996.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "【促销宝】淘宝搜索那里长时间不显示折扣价解决方法",
                        "type"         : "fixed",
                        "promoPrice"   : "39996.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523275294577"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-27 21:15",
                        "hasShowcase"  : true,
                        "listTime"     : "2016-08-20 21:15",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523274601679,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i2/TB1Eu1uKXXXXXa.XVXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "39988.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "【促销宝】新手快速入门必看教程秘籍",
                        "type"         : "fixed",
                        "promoPrice"   : "39988.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523274601679"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-29 15:14",
                        "hasShowcase"  : true,
                        "listTime"     : "2016-08-22 15:14",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523159076487,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1DplCKXXXXXX5XFXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "40017.00",
                        "sellerCids"   : ",1117119982,",
                        "soldQuantity" : 0,
                        "title"        : "【好礼等你拆】如何查看活动带来的收藏粉丝数",
                        "type"         : "fixed",
                        "promoPrice"   : "40017.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523159076487"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50023725,
                        "delistTime"   : "2016-08-29 15:14",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-08-22 15:14",
                        "modified"     : "2016-08-24 22:36",
                        "numIid"       : 523152202240,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i1/TB1LeBQKXXXXXaSXXXXXXXXXXXX_!!2-item_pic.png",
                        "price"        : "19998.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "【好礼等你拆】怎样把好礼等你拆活动装修到手机店铺首页",
                        "type"         : "fixed",
                        "promoPrice"   : "19998.00",
                        "url"          : "http://item.taobao.com/item.htm?id=523152202240"
                    }],
                    "totalItemCount": 7
                })
            })

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
        }
    }
}
