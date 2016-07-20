export const modules = [
    {
        title: '宝贝模块',
        items: [
            {
                alias    : '热卖单品',
                type     : 'goods-hot-sale',
                picUrl   : require('../assets/img/单列宝贝.png'),
                component: (resolve) => require(['./goods-hot-sale.vue'], resolve)
            },
            {
                alias    : '单列宝贝',
                type     : 'goods-singe',
                picUrl   : require('../assets/img/单列宝贝.png'),
                component: (resolve) => require(['./goods-singe.vue'], resolve)
            },
            {
                alias    : '双列宝贝',
                type     : 'goods-two',
                picUrl   : require('../assets/img/双列宝贝.png'),
                component: (resolve) => require(['./goods-two.vue'], resolve)
            }
        ]
    }
]

export let components = _.reduce(_.chain(modules).map('items').flatten().value(), (obj, item) => {
    obj[item.type] = item.component
    return obj
}, {})

