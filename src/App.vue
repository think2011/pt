<template>
    <loading-bar
            :progress.sync="loadingProgress">
    </loading-bar>

    <header>
        <div class="title">无线模板制作</div>

        <div>
            <ui-button
                    color="default"
                    icon="exit_to_app"
                    @click="close">
                退出
            </ui-button>
            <ui-button
                    color="primary"
                    icon="save"
                    @click="save">
                {{modeName}}制作
            </ui-button>
        </div>
    </header>

    <div v-if="loaded"
         class="container">
        <module-box></module-box>

        <render></render>

        <property-editor></property-editor>
    </div>


    <ui-snackbar-container position="center">
    </ui-snackbar-container>
</template>

<script type="text/ecmascript-6">
    import api from './api'
    import store from './vuex/store'
    import render from './components/render.vue'
    import moduleBox from './components/module-box.vue'
    import propertyEditor from './components/property-editor.vue'
    import loadingBar from 'vue-loading-bar'
    import 'vue-loading-bar/vue-loading-bar.css'
    import popover from './components/popover.vue'
    import {
            showToast,
            addRenderItem,
            focusDocumentTitle,
    } from './vuex/actions'

    export default {
        store,

        components: {
            propertyEditor,
            moduleBox,
            render,
            loadingBar,
            popover
        },

        ready (){
            switch (window.QUERYSTRING.type) {
                case 'create':
                    api.base.tplById(window.QUERYSTRING.id).then((res) => {
                        let _data = JSON.parse(res.data)

                        this.renderData.title = _data.title
                        this.renderData.items = _data.items
                        this.createStyle(res.style)
                    })
                    break;

                case 'edit':
                    this.modeName = '更新'
                    api.base.editById(window.QUERYSTRING.id).then((res) => {
                        let _data = JSON.parse(res.data)

                        this.renderData.title = _data.title
                        this.renderData.items = _data.items
                        this.createStyle(res.style)
                    })
                    break;

                default:
                    this.addRenderItem('poster-single')
                    setTimeout(() => {
                        this.addRenderItem('poster-many')
                    }, 0)
            }

            // toast
            this.$watch('toast', (value) => {
                this.$broadcast('ui-snackbar::create', _.clone(value))
            })

            // 顶部加载状态
            let interVal = null
            this.$watch('ajaxLoading', (value) => {
                if (!value || interVal) {
                    clearInterval(interVal)
                    return this.loadingProgress = 100
                }
                this.loadingProgress = 10

                interVal = setInterval(() => {
                    if (this.loadingProgress > 95) {
                        this.loadingProgress = 100
                        clearInterval(interVal)
                        return
                    }
                    this.loadingProgress += (Math.floor(Math.random() * (20 - 1)) + 1)
                }, 1000)
            })

            // 初始化数据
            Promise.all([
                api.base.initials(),
                api.goods.list(),
            ]).then((res) => {
                window.USER_INFO = res[0]
                this.loaded      = true
            })

            // 预加载资源
            api.goods.categories()
            api.pic.categories()
        },

        vuex: {
            getters: {
                renderData : ({render}) => render,
                toast      : ({toast}) => toast.item,
                ajaxLoading: ({loadingBar}) => loadingBar.loading
            },
            actions: {
                addRenderItem,
                showToast,
                focusDocumentTitle
            }
        },

        methods: {
            save() {
                let {items, title} = _.clone(this.renderData)

                if (title === '网页标题') {
                    this.showToast({
                        message : `请输入合适的网页标题`,
                        duration: 1000
                    })
                    return this.focusDocumentTitle(true)
                }

                // 删除多余数据
                _.each(items, (value) => {
                    delete value._timestamp
                })

                let data = JSON.stringify({
                    items,
                    title
                })


                this.postMessage({type: 'save', data})
                console.log(data)
            },

            close() {
                this.postMessage({type: 'close'})
            },

            postMessage(data) {
                window.parent.postMessage(data, '*')
            },
            createStyle(str, target = 'head') {
                let style = document.createElement('style')

                style.innerHTML = str
                document.querySelector(target).appendChild(style)
            }
        },

        data: () => {
            return {
                modeName       : '保存',
                loaded         : false,
                loadingProgress: 0
            }
        }
    }
</script>


<style lang="scss" rel="stylesheet/scss">
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        user-select: none;
    }

    header {
        width: 100%;
        height: 55px;
        line-height: 55px;
        color: #fff;
        padding: 0 30px;
        position: absolute;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E7E8E7;

        .title {
            font-size: 24px;
            color: #9B9B9B;
        }

        button {
            margin-top: 6px;
        }
    }

    .container {
        display: flex;
        max-height: 100%;
        min-height: 100%;
        padding-top: 55px;
        overflow: auto;

        .module-box {
            flex: 0 0 230px;
            border-right: 1px solid #E7E8E7;

            li {
                margin: 30px;
            }
        }

        .render-container {
            min-width: 470px;
            flex: 1;
            background: #F7F7F7;
        }

        .properties {
            flex: 0 0 450px;
            position: relative;
            border-left: 1px solid #E7E8E7;
            overflow: auto;
        }

        .module-box,
        .render-container {
            user-select: none;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;

            a, img {
                user-select: none;
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            }
        }
    }
</style>
