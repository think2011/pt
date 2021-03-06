import Vue from 'vue'
import store from '../vuex/store'

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

// loading bar
Vue.http.interceptors.push((request, next) => {
    let timer = setTimeout(() => {
        store.dispatch('CHANGE_LOADING_BAR', true)
    }, 500)

    next((res) => {
        clearTimeout(timer)
        store.dispatch('CHANGE_LOADING_BAR', false)
    });
});

// cache
Vue.http.interceptors.push((request, next) => {
    let url = `${request.url}?${toUrlParams(request.params)}`

    if (request.method.toLowerCase() === 'get' && request.cache !== false) {
        let _cache = Cache.get(url);

        if (_cache) {
            request.client = function () {
                return _cache;
            };
        }
    }

    next((response) => {
        if (response.status === 200 && request.method.toLowerCase() === 'get' && request.cache !== false) {
            Cache.set(url, response);
        }
    });
});


// sellerID interceptors
Vue.http.interceptors.push((req, next) => {
    req.params.sellerId = window.SELLER_ID

    next()
})


// goods interceptors
Vue.http.interceptors.push((req, next) => {
    next((res) => {
        let data     = res.json()
        let isZyData = _.isObject(data) && ('success' in data) && (data.success)

        if (isZyData) {
            let addField = (item) => {
                if ('numIid' in item || 'itemId' in item) {
                    // 没有促销价用原价代替
                    item.promoPrice = item.promoPrice || item.price

                    // 生成url
                    item.url = `http://item.taobao.com/item.htm?from=mobile_maker&id=${item.numIid}`
                }
            }

            try {
                _.each(data.data.items, (item) => {
                    addField(item)

                    if (item.itemList) {
                        item.itemList.forEach(addField)
                    }
                })

                res.body = JSON.stringify(data)
            } catch (err) {
                console.error('goods interceptors')
            }
        }
    })
})

// modules interceptors
Vue.http.interceptors.push((req, next) => {
    next((res) => {
        let data     = res.json()
        let isZyData = _.isObject(data) && ('success' in data) && (data.success)

        if (isZyData && data.data.data) {
            try {
                let moduleData = JSON.parse(data.data.data.data)

                _.each(moduleData.items, (item, key) => item._timestamp = item._timestamp || Date.now() + key)
                data.data.data.data = JSON.stringify(moduleData)
                res.body            = JSON.stringify(data)
            } catch (err) {
                console.error('modules interceptors')
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

