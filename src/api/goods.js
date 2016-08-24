module.exports = function (http) {
    return {
        list(...args) {
            let options = _.assign({
                params: {
                    type: 'Keyword',
                    q   : ''
                }
            }, args)

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
