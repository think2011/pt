module.exports = function (http) {
  return {
    list: (...args) => {
      let options = _.assign({
        params: {
          type: 'Keyword',
          q   : ''
        }
      }, args)

      return http
        .get('/api/taobao/items', options)
        .then((res) => res.json().data)
    }
  }
}
