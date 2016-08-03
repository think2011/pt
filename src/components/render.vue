<template>
    <div @click="blurRenderItem" class="render-container">
        <div drag-tag="modules"
             :class="{active: activeModules}"
             class="body">
            <input autofocus
                   class="page-title"
                   type="text"
                   v-model="render.title">
            <div
                    transition="fadeIn"
                    stagger="1000"
                    class="animated item"
                    :class="{'current': currentModule === item}"
                    v-for="item in items">

                <ul v-show="!activeModule.position" class="actions">
                    <li>
                        <ui-icon-button
                                @mousedown="drag(item)"
                                class="btn-sm"
                                color="default"
                                icon="touch_app">
                        </ui-icon-button>
                    </li>
                </ul>

                <component
                        drag-tag="module-{{$index}}"
                        @click.stop.prevent="editRenderItem(item)"
                        index="{{$index}}"
                        class="component"
                        :class="[{active: activeModule.dragTag === 'module-' + $index}, activeModule.position]"
                        :component-data.sync="item.data"
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

                &:hover {
                    .actions {
                        display: flex;
                        visibility: visible;
                        transform: scale(1);
                    }
                }

                &.fadeOut {
                    animation-duration: 0s;
                }

                &.current {
                    outline: 2px solid #2196F3;
                    z-index: 9998;
                }

                .actions {
                    position: absolute;
                    margin: 5px 8px;
                    right: 0;
                    flex-flow: column wrap;
                    visibility: hidden;
                    transition: all .3s ease;
                    transform: scale(0);
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
            editRenderItem,
            blurRenderItem
    } from '../vuex/actions'
    import moduleDrag from './module-drag.vue'

    Vue.transition('fadeIn', {
        enterClass: 'fadeInLeft',
        leaveClass: 'fadeOut'
    })

    export default{
        components: {...components, moduleDrag},

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
                render       : ({render}) => render,
                items        : ({render}) => render.items,
                activeModules: ({render}) => render.dragInfo.dragTag === 'modules',
                activeModule : ({render}) => render.dragInfo,
                currentModule: ({render}) => render.current
            },

            actions: {
                editRenderItem,
                blurRenderItem
            }
        },

        methods: {
            drag(item) {
                this.del(item)
                this.dragModule = item
            },
            del(item) {
                this.items.$remove(item)
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

