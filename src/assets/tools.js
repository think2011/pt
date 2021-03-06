import api from '../api'

export let goods = {
    title       : "测试宝贝标题测试宝贝标题测试宝贝标题测试宝贝标题",
    picUrl      : 'https://img.alicdn.com/bao/uploaded/i3/TB1Pg.AJVXXXXbQXVXXXXXXXXXX_!!0-item_pic.jpg',
    itemImgs    : [
        {
            id      : 0,
            position: 0,
            url     : "https://img.alicdn.com/bao/uploaded/i2/TB1ZeloKXXXXXXHXpXXXXXXXXXX_!!0-item_pic.jpg"
        }
    ],
    price       : "3998.00",
    soldQuantity: 300,
    promoPrice  : "1000.00",
    numIid      : 523274601679,
    url         : "http://item.taobao.com/item.htm?id=523274601679"
}


export let posterUrls = [
    'http://img.alicdn.com/imgextra/i2/2406822118/TB2JeNDXqm5V1BjSspoXXa8VXXa_!!2406822118.jpg',
    'https://img.alicdn.com/imgextra/i3/92779311/TB2uGl0nXXXXXbxXpXXXXXXXXXX-92779311.jpg'
]

export let fetchGoods = function (num, mergeObj) {
    return api.goods
        .list()
        .then(({items}) => {
            return _.chain(items).take(num).each((item) => _.merge(item, mergeObj)).value()
        })
}
