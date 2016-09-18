module.exports = function (http) {
    return {
        initials() {
            return http
                .get(`/api/homepage/initials`)
                .then((res) => _.get(res.json(), 'data'))
        },

        tplById(id) {
            return http
                .get(`/api/wirelesspage/tpls/${id}`)
                .then((res) => _.get(res.json(), 'data.data'))
        },

        editById(id) {
            return http
                .get(`/api/wirelesspages/${id}`)
                .then((res) => _.get(res.json(), 'data.data'))
        }
    }
}
