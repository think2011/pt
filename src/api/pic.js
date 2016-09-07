module.exports = function (http) {
    return {
        /**
         * 获取分类
         */
        categories() {
            return http({
                method: 'GET',
                url   : '/api/taobao/picture-cats',
            })
                .then((res) => res.json().data)
                .then(function (res) {
                    res.items.unshift({
                        pictureCategoryId  : null,
                        pictureCategoryName: '全部分类'
                    })

                    return res
                })

        }
    }
}
