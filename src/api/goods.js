module.exports = function (http) {
    return {
        list(...args) {
            let options = _.assign({
                params: {
                    type: 'Keyword',
                    q   : ''
                }
            }, args)


            // TODO ZH 16/7/12

            return new Promise((resolve, reject) => {
                resolve({
                    "pageCount"     : 15,
                    "page"          : 1,
                    "size"          : 10,
                    "items"         : [{
                        "approveStatus": "onsale",
                        "cid"          : 50011150,
                        "delistTime"   : "2016-07-13 16:25",
                        "hasShowcase"  : true,
                        "listTime"     : "2016-07-06 16:25",
                        "modified"     : "2016-07-13 11:59",
                        "numIid"       : 533169022647,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1t4PmKXXXXXXIXXXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "314.45",
                        "sellerCids"   : ",1117121990,",
                        "soldQuantity" : 0,
                        "title"        : "韩国美容刮眉刀画眉修眉刀仪器化妆师专用日本修眉毛刀片(10片装)",
                        "type"         : "fixed",
                        "promoPrice"   : "314.45",
                        "url"          : "http://item.taobao.com/item.htm?id=533169022647"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 162104,
                        "delistTime"   : "2016-07-20 11:59",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-13 11:59",
                        "modified"     : "2016-07-13 11:59",
                        "numIid"       : 43573214765,
                        "outerId"      : "广州_大西豪8F815-D_吉吉家_P30_#7271",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1lN6VFVXXXXaUXpXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "1650.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "韩国刺绣情侣衬衣小清新男女修身长袖衬衫潮",
                        "type"         : "fixed",
                        "promoPrice"   : "1650.00",
                        "url"          : "http://item.taobao.com/item.htm?id=43573214765"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50011150,
                        "delistTime"   : "2016-07-20 11:45",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-13 11:45",
                        "modified"     : "2016-07-13 11:46",
                        "numIid"       : 533110599442,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB18XKUJVXXXXXTXFXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "314.90",
                        "sellerCids"   : ",1117121990,",
                        "soldQuantity" : 0,
                        "title"        : "还不晚 创意可爱陶瓷手柄水果叉 吃水果的小叉子不锈钢儿童水果签",
                        "type"         : "fixed",
                        "promoPrice"   : "314.90",
                        "url"          : "http://item.taobao.com/item.htm?id=533110599442"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50025943,
                        "delistTime"   : "2016-07-13 15:40",
                        "hasShowcase"  : true,
                        "listTime"     : "2016-07-06 15:40",
                        "modified"     : "2016-07-13 11:46",
                        "numIid"       : 533110551376,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i2/TB1SiEjKXXXXXcGXXXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "314.80",
                        "sellerCids"   : ",1117121990,",
                        "soldQuantity" : 0,
                        "title"        : "塑料抽屉式储物盒家用桌面内衣袜子文胸内裤领带分格收纳盒无盖",
                        "type"         : "fixed",
                        "promoPrice"   : "314.80",
                        "url"          : "http://item.taobao.com/item.htm?id=533110551376"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50009032,
                        "delistTime"   : "2016-07-20 10:35",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-13 10:35",
                        "modified"     : "2016-07-13 10:36",
                        "numIid"       : 43573690234,
                        "outerId"      : "广州_十三行桨栏路13_川久保邻play_P27.30_#1",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB1Eh3cGVXXXXc8XVXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "2761.00",
                        "sellerCids"   : ",1117119982,",
                        "soldQuantity" : 0,
                        "title"        : "潮带编织帆布腰带男女休闲拼色学生腰带平滑扣裤腰带韩版潮流腰带",
                        "type"         : "fixed",
                        "promoPrice"   : "2761.00",
                        "url"          : "http://item.taobao.com/item.htm?id=43573690234"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 162103,
                        "delistTime"   : "2016-07-20 10:25",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-13 10:25",
                        "modified"     : "2016-07-13 10:25",
                        "numIid"       : 43590134899,
                        "outerId"      : "打开速度来看",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i1/TB16iBXKXXXXXcqXFXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "1800.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "20162014冬季新款情侣装欧美风渐变混色毛线套头情侣毛衣男女",
                        "type"         : "fixed",
                        "promoPrice"   : "1800.00",
                        "url"          : "http://item.taobao.com/item.htm?id=43590134899"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 122690003,
                        "delistTime"   : "2016-07-20 09:41",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-13 09:41",
                        "modified"     : "2016-07-13 09:42",
                        "numIid"       : 531667482496,
                        "outerId"      : "狮岭商圈F1/狮岭益群胡屋淘宝村河边二路_90#5219@王妃国际总汇",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i4/TB14fs.JVXXXXcKXFXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "1108.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "潮牌帽子双肩包",
                        "type"         : "fixed",
                        "promoPrice"   : "1108.00",
                        "url"          : "http://item.taobao.com/item.htm?id=531667482496"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50011150,
                        "delistTime"   : "2016-07-14 21:06",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-07 21:06",
                        "modified"     : "2016-07-13 09:38",
                        "numIid"       : 533227984869,
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i3/TB1htBIJXXXXXbwXpXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "350.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "开裆露乳透明蕾丝极度性感睡衣女式真人成人情趣内衣套装诱惑制服",
                        "type"         : "fixed",
                        "promoPrice"   : "350.00",
                        "url"          : "http://item.taobao.com/item.htm?id=533227984869"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50000671,
                        "delistTime"   : "2016-07-18 10:32",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-11 10:32",
                        "modified"     : "2016-07-13 09:38",
                        "numIid"       : 43568187967,
                        "outerId"      : "打开速度来看",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i3/TB1Pg.AJVXXXXbQXVXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "4030.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "T恤修身显瘦优雅打底衫潮",
                        "type"         : "fixed",
                        "promoPrice"   : "4030.00",
                        "url"          : "http://item.taobao.com/item.htm?id=43568187967"
                    }, {
                        "approveStatus": "onsale",
                        "cid"          : 50012825,
                        "delistTime"   : "2016-07-17 20:57",
                        "hasShowcase"  : false,
                        "listTime"     : "2016-07-10 20:57",
                        "modified"     : "2016-07-13 09:38",
                        "numIid"       : 43568403587,
                        "outerId"      : "打开速度来看",
                        "picUrl"       : "https://img.alicdn.com/bao/uploaded/i3/TB1k.EpJFXXXXatXVXXXXXXXXXX_!!0-item_pic.jpg",
                        "price"        : "1597.00",
                        "sellerCids"   : "-1",
                        "soldQuantity" : 0,
                        "title"        : "20162015秋季新款时尚欧美高跟鞋细跟鞋防水台深口单鞋女",
                        "type"         : "fixed",
                        "promoPrice"   : "1597.00",
                        "url"          : "http://item.taobao.com/item.htm?id=43568403587"
                    }],
                    "totalItemCount": 142
                })
            })


            return http
                .get('/api/taobao/items', options)
                .then((res) => res.json().data)
        },
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

        }
    }
}
