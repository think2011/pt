<template>
    <header>
        <div class="title">T</div>

        <div>
            <ui-button
                    color="primary"
                    icon="save"
                    @click="save">
                保存
            </ui-button>
        </div>
    </header>

    <div v-if="loaded"
         class="container">
        <module-box></module-box>

        <render></render>

        <property-editor></property-editor>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
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
            font-size: 36px;
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

        .module-box {
            flex: 0 0 240px;
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
            flex: 0 0 470px;
            position: relative;
            border-left: 1px solid #E7E8E7;
        }
    }
</style>

<script type="text/ecmascript-6">
    import api from './api'
    import store from './vuex/store'
    import render from './components/render.vue'
    import moduleBox from './components/module-box.vue'
    import propertyEditor from './components/property-editor.vue'
    import {
            addRenderItem,
    } from './vuex/actions'

    export default {
        store,

        components: {
            propertyEditor,
            moduleBox,
            render
        },

        ready (){
            api.goods.list().then(() => this.loaded = true)

            // TODO ZH 16/7/6
            this.addRenderItem('goods-singe')
        },

        vuex: {
            getters: {
                renderData: ({render}) => render
            },
            actions: {
                addRenderItem
            }
        },

        methods: {
            save() {
                let {items, title} = this.renderData

                console.log(JSON.stringify({
                    items,
                    title
                }))
            }
        },

        data: () => {
            return {
                loaded: false
            }
        }
    }
</script>

