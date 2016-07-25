module.exports = function (http) {
    return {
        tplById(id) {
            return http
                .get(`/api/wirelesspage/tpls/${id}`)
                .then((res) => _.get(res.json(), 'data.tpl.data'))
        },

        editById(id) {
            return http
                .get(`/api/wirelesspage/${id}`)
                .then((res) => _.get(res.json(), 'data.tpl.data'))
        }
    }
}