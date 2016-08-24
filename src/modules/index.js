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
            },
            {
                alias    : '三列宝贝',
                type     : 'goods-three',
                picUrl   : require('../assets/img/三列宝贝.png'),
                component: (resolve) => require(['./goods-three.vue'], resolve)
            }
        ]
    },
    {
        title: '海报',
        items: [
            {
                alias    : '单张海报',
                type     : 'poster-singe',
                picUrl   : require('../assets/img/单张海报.png'),
                component: (resolve) => require(['./poster-singe.vue'], resolve)
            },
            {
                alias    : '轮播海报',
                type     : 'poster-many',
                picUrl   : require('../assets/img/轮播海报.png'),
                component: (resolve) => require(['./poster-many.vue'], resolve)
            }
        ]
    },
    {
        title: '其他',
        items: [
            {
                alias    : '倒计时',
                type     : 'countdown',
                picUrl   : require('../assets/img/倒计时.png'),
                component: (resolve) => require(['./countdown.vue'], resolve)
            }
        ]
    }
]

export let components = _.reduce(_.chain(modules).map('items').flatten().value(), (obj, item) => {
    obj[item.type] = item.component
    return obj
}, {})

