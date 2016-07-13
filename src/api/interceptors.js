import Vue from 'vue'

let Cache = {
    cache: {},
    set  : function (url, res) {
        this.cache[url] = res
    },
    get  : function (url) {
        return this.cache[url]
    }
}

window.Cache = Cache

// cache
Vue.http.interceptors.push((request, next) => {
    let url = `${request.url}?${toUrlParams(request.params)}`
    if (request.method.toLowerCase() === 'get') {
        let _cache = Cache.get(url);

        if (_cache) {
            request.client = function () {
                return _cache;
            };
        }
    }

    next((response) => {
        if (response.status === 200 && request.method.toLowerCase() === 'get') {
            Cache.set(url, response);
        }
    });
});


// goods interceptors
Vue.http.interceptors.push((req, next) => {
    next((res) => {
        let data     = res.json()
        let isZyData = _.isObject(data) && ('success' in data)

        if (isZyData) {
            try {
                _.each(data.data.items, (item) => {
                    if ('numIid' in item) {
                        // 没有促销价用原价代替
                        item.promoPrice = item.promoPrice || item.price

                        // 生成url
                        item.url = `http://item.taobao.com/item.htm?id=${item.numIid}`
                    }
                })

                res.body = JSON.stringify(data)
            } catch (err) {
            }
        }
    })
})


/**
 * toUrlParams
 * @param obj
 */
function toUrlParams(obj) {
    return Object.keys(obj).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}