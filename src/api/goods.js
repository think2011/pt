module.exports = function (http) {
  return {
    list: (...args) => {
      let options = _.assign({
        params: {
          type: 'Keyword',
          q   : ''
        }
      }, args)


      // TODO ZH 16/7/12

      return new Promise((resolve, reject) => {
        resolve({
          pageCount     : 15,
          page          : 1,
          size          : 10,
          items         : [
            {
              approveStatus: "onsale",
              cid          : 50006858,
              delistTime   : "2016-07-19 16:25",
              hasShowcase  : false,
              listTime     : "2016-07-12 16:25",
              modified     : "2016-07-12 16:26",
              numIid       : 533197117754,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i1/TB10ctFLVXXXXcMaXXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "324.90",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "厨房水槽挂篮沥水篮浴室置物架创意时尚厨房小收纳挂袋",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50005058,
              delistTime   : "2016-07-12 20:43",
              hasShowcase  : true,
              listTime     : "2016-07-05 20:43",
              modified     : "2016-07-12 16:26",
              numIid       : 533110483062,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i3/TB1EioRJVXXXXXeXFXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "314.80",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "防风晾衣夹 多夹子晒袜子内衣服塑料裤架 婴儿童宝宝多功能晾衣架",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50000436,
              delistTime   : "2016-07-12 20:32",
              hasShowcase  : true,
              listTime     : "2016-07-05 20:32",
              modified     : "2016-07-12 16:21",
              numIid       : 43573462001,
              outerId      : "广州_更多荔湾区110_反古派韩日店_P26_#2015",
              picUrl       : "https://img.alicdn.com/bao/uploaded/i1/TB1y72ZGpXXXXapXpXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "1600.00",
              sellerCids   : ",1117119981,",
              soldQuantity : 0,
              title        : "半袖t恤男短袖万斯全棉街舞嘻哈风短袖t恤大码",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50009032,
              delistTime   : "2016-07-19 16:20",
              hasShowcase  : false,
              listTime     : "2016-07-12 16:20",
              modified     : "2016-07-12 16:21",
              numIid       : 43573726236,
              outerId      : "广州_十三行桨栏路13_川久保邻play_P27.30_#2",
              picUrl       : "https://img.alicdn.com/bao/uploaded/i3/TB1AbU3JpXXXXbUXFXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "4720.00",
              sellerCids   : ",1117119982,",
              soldQuantity : 0,
              title        : "个性帆布腰带男嘻潮腰带时尚百搭韩版裤带英国旗印花",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50019045,
              delistTime   : "2016-07-19 15:54",
              hasShowcase  : false,
              listTime     : "2016-07-12 15:54",
              modified     : "2016-07-12 15:54",
              numIid       : 533228796223,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i3/TB1C.pZJVXXXXcuXVXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "306.10",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "塑料小刷子水晶刷鞋子清洁刷软毛洗衣服洗衣刷洗鞋刷",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50012922,
              delistTime   : "2016-07-19 15:50",
              hasShowcase  : false,
              listTime     : "2016-07-12 15:50",
              modified     : "2016-07-12 15:51",
              numIid       : 533169426756,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i2/TB1gQrQJVXXXXaTXXXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "312.50",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "6553 可叠加塑料密封盒密封罐子 五谷杂粮储物罐收纳盒子",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50011150,
              delistTime   : "2016-07-19 11:59",
              hasShowcase  : false,
              listTime     : "2016-07-12 11:59",
              modified     : "2016-07-12 12:00",
              numIid       : 533229016332,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i4/TB1BNwmKXXXXXXMXpXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "312.40",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "包邮创意时尚可爱精品纸巾盒 笑脸卫生间车用家用塑料抽纸盒子",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50025791,
              delistTime   : "2016-07-19 11:46",
              hasShowcase  : false,
              listTime     : "2016-07-12 11:46",
              modified     : "2016-07-12 11:46",
              numIid       : 533197305992,
              picUrl       : "https://img.alicdn.com/bao/uploaded/i3/TB1hPCBKXXXXXcKXXXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "309.45",
              sellerCids   : ",1117121990,",
              soldQuantity : 0,
              title        : "加厚不沾油不掉毛吸水抹布厨房清洁毛巾百洁布洗碗布洗碗巾",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50010850,
              delistTime   : "2016-07-15 22:59",
              hasShowcase  : false,
              listTime     : "2016-07-08 22:59",
              modified     : "2016-07-12 11:30",
              numIid       : 534645462352,
              outerId      : "广州女人街1F-05_7898282@園亿阁_#8818_P38",
              picUrl       : "https://img.alicdn.com/bao/uploaded/i4/2406822118/TB2G1jaspXXXXarXXXXXXXXXXXX_!!2406822118.jpg",
              price        : "550.00",
              sellerCids   : "-1",
              soldQuantity : 0,
              title        : "实拍2016新款夏季连衣裙女 无袖碎花印花裙显瘦中长款百褶裙8818",
              type         : "fixed"
            },
            {
              approveStatus: "onsale",
              cid          : 50000671,
              delistTime   : "2016-07-18 10:32",
              hasShowcase  : false,
              listTime     : "2016-07-11 10:32",
              modified     : "2016-07-12 11:28",
              numIid       : 43568187967,
              outerId      : "打开速度来看",
              picUrl       : "https://img.alicdn.com/bao/uploaded/i3/TB1Pg.AJVXXXXbQXVXXXXXXXXXX_!!0-item_pic.jpg",
              price        : "4030.00",
              sellerCids   : "-1",
              soldQuantity : 0,
              title        : "T恤修身显瘦优雅打底衫潮",
              type         : "fixed"
            }
          ],
          totalItemCount: 142
        })
      })


      return http
        .get('/api/taobao/items', options)
        .then((res) => res.json().data)
    }
  }
}
