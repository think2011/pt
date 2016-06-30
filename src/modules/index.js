export let modules = [
  {
    alias    : '热卖宝贝',
    type     : 'goods-poster',
    component: (resolve) => require(['./goods-poster.vue'], resolve)
  }
]

export let components = {}
modules.forEach((item) => components[item.type] = item.component)
