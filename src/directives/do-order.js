import Vue from 'vue'

Vue.directive('doOrder', {
    params       : [
        'do-order-options'
    ],
    paramWatchers: {
        doOrderOptions(){
            let that = this
            let {index, items} = that.params.doOrderOptions

            if (that.modifiers.down) {
                this.el.disabled = index === items.length - 1
            }
            if (that.modifiers.up) {
                this.el.disabled = index === 0
            }
        }
    },

    bind: function () {
        let that  = this
        let items = that.params.doOrderOptions.items

        that.on('click', () => {
            let index = that.params.doOrderOptions.index

            if (that.modifiers.down) {
                order(index + 1, index)
            }
            if (that.modifiers.up) {
                order(index - 1, index)
            }
        })

        function order(newIndex, oldIndex) {
            items.splice(newIndex, 0, items.splice(oldIndex, 1)[0])
        }
    }
})