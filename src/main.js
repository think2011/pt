import Vue from 'vue'
import _ from 'lodash'

import 'normalize.css/normalize.css'
import './assets/css/styles.scss'
import './assets/css/tanstions.scss'
import './assets/css/styles-client.scss'
import './skins/default.scss'

window.QUERYSTRING = (function () {
    var params = {},
        pair   = (window.location.search.substr(1)).split('&');

    if (pair[0]) {
        for (var i = 0; i < pair.length; i++) {
            var pos = pair[i].split('=');

            params[pos[0]] = decodeURIComponent(pos[1]);
        }
    }

    return params;
})();

Vue.use(require('vue-resource'))

