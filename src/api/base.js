module.exports = function (http) {
    return {
        tplById(id) {
            return http
                .get(`/api/wirelesspage/tpls/${id}`)
                .then((res) => _.get(res.json(), 'data.tpl'))
        },

        editById(id) {
            return http
                .get(`/api/wirelesspages/${id}`)
                .then((res) => _.get(res.json(), 'data.page.data'))
        }
    }
}
