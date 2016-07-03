export const modules = [
  {
    alias    : '热卖宝贝',
    type     : 'goods-poster',
    component: (resolve) => require(['./goods-poster.vue'], resolve)
  }
]

export const components = _.reduce(modules, (obj, item) => {
  obj[item.type] = item.component
  return obj
}, {})

