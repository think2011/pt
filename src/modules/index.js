export const modules = [
    {
        title: '宝贝模块',
        items: [
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
    },
    {
        title: '其他',
        items: [
            {
                alias    : '单张海报',
                type     : 'other-poster',
                picUrl   : require('../assets/img/单张海报.png'),
                component: (resolve) => require(['./other-poster.vue'], resolve)
            }
        ]
    }
]

export let components = _.reduce(_.chain(modules).map('items').flatten().value(), (obj, item) => {
    obj[item.type] = item.component
    return obj
}, {})

