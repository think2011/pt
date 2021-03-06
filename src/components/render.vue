<template>
    <div @click="blurRenderItem" class="render-container">
        <div drag-tag="modules"
             :class="{active: activeModules}"
             class="body">

            <input
                    class="page-title animated"
                    :class="{flash:base.activeDocumentTitle}"
                    type="text"
                    v-el:document-title
                    v-model="render.title">
            <div
                    transition="fadeIn"
                    class="animated item"
                    track-by="_timestamp"
                    :class="{'current': currentModule === item}"
                    v-for="item in items">

                <sort-bar
                        @on-sort="onSort"
                        v-show="currentModule === item"
                        :items="items"
                        :item="item">
                    <li class="hint--top" aria-label="拖拽" v-if="items.length > 1">
                        <ui-icon-button
                                @mousedown="drag(item)"
                                class="btn-sm"
                                color="default"
                                icon="touch_app">
                        </ui-icon-button>
                    </li>
                </sort-bar>

                <component
                        drag-tag="module-{{$index}}"
                        @click.stop.prevent="editRenderItem(item)"
                        index="{{$index}}"
                        class="component"
                        :class="[{active: activeModule.dragTag === 'module-' + $index}, activeModule.position]"
                        :data.sync="item.data"
                        :is="components[item.type]">
                </component>
            </div>
        </div>

        <module-drag
                :drag-module.sync="dragModule">
        </module-drag>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .render-container {
        overflow-y: auto;

        .body {
            width: 375px;
            min-height: 667px;
            background: #fff url("../assets/img/phone-head.png") no-repeat;
            padding-top: 64px;
            margin: 20px auto 30px auto;
            user-select: none;
            box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.30);
            position: relative;

            .page-title {
                border: none;
                font-size: 20px;
                text-align: center;
                position: absolute;
                top: 27px;
                left: 73px;
                width: 210px;
                background: #F9F9F9;
            }

            &.active {
                outline: 2px solid #2196F3;
            }

            .item {
                cursor: pointer;
                position: relative;
                animation-duration: .4s;

                &.current {
                    outline: 2px solid #2196F3;
                    z-index: 9998;
                }
            }

            .component {
                &.active.top {
                    &:before {
                        width: 98%;
                        height: 20px;
                        line-height: 20px;
                        margin: 0 auto;
                        font-size: 14px;
                        text-align: center;
                        display: block;
                        content: '放在这';
                        border: 2px dashed #2196F3;
                        background: #E4F3FE;
                        padding: 5px 0;
                        color: #2196F3;
                    }
                }
                &.active.bottom {
                    &:after {
                        @extend .component.active.top:before
                    }
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    import {components, modules} from '../modules'
    import {
            showToast,
            editRenderItem,
            blurRenderItem
    } from '../vuex/actions'
    import moduleDrag from './module-drag.vue'
    import sortBar from './sort-bar.vue'

    Vue.transition('fadeIn', {
        enterClass: 'fadeInLeft',
        leaveClass: 'hide'
    })

    export default{
        components: {...components, moduleDrag, sortBar},

        ready () {
            // 模拟移动端rem大小环境
            setFontSize()
            window.addEventListener("resize", setFontSize)

            function setFontSize() {
                document.documentElement.style.fontSize = `${(document.querySelector('[drag-tag="modules"]').clientWidth) * 20 / 320}px`
            }
        },

        vuex: {
            getters: {
                base         : ({base}) => base,
                render       : ({render}) => render,
                items        : ({render}) => render.items,
                activeModules: ({render}) => render.dragInfo.dragTag === 'modules',
                activeModule : ({render}) => render.dragInfo,
                currentModule: ({render}) => render.current
            },

            actions: {
                editRenderItem,
                blurRenderItem,
                showToast
            }
        },

        watch: {
            'base.activeDocumentTitle'(newVal) {
                this.$els.documentTitle.focus()
                this.$els.documentTitle.addEventListener('webkitAnimationEnd', () => {
                    this.base.activeDocumentTitle = false
                })
            }
        },

        methods: {
            drag(item) {
                this.items.$remove(item)
                this.dragModule = item
            },
            hoverItem(item) {
                _.forEach(this.items, (item) => item._hover = false)
                item._hover = true
            },
            onSort(newIndex, oldIndex){
                setTimeout(() => {
                    this.$store.dispatch('EDIT_RENDER_ITEM', this.items[newIndex])
                }, 0)
            }
        },

        data: () => {
            return {
                modules,
                components,
                dragModule: {}
            }
        }
    }
</script>

