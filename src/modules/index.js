export const modules = [
  {
    alias    : '热卖单品模块',
    type     : 'goods-hot-sale',
    component: (resolve) => require(['./goods-hot-sale.vue'], resolve)
  }
]

export const components = _.reduce(modules, (obj, item) => {
  obj[item.type] = item.component
  return obj
}, {})

