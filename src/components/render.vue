<template>
    <div @click="blurRenderItem" class="render-container">
        <div>
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
                    <ul class="actions">
                        <li>
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    type="flat"
                                    v-do-order.up
                                    :do-order-options="{items:items,index:$index}"
                                    icon="expand_less">
                            </ui-icon-button>
                        </li>
                        <li>
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    v-do-order.down
                                    :do-order-options="{items:items,index:$index}"
                                    type="flat"
                                    icon="expand_more">
                            </ui-icon-button>
                        </li>
                        <li>
                            <ui-icon-button
                                    class="btn-sm"
                                    color="default"
                                    type="flat"
                                    @click="del(item)"
                                    icon="delete">
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
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .xxx {
        background: seagreen;
    }

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

                    .actions {
                        position: absolute;
                        right: -38px;
                        top: 0;
                        display: block;

                        li {
                            margin-bottom: 5px;
                        }
                    }
                }

                .actions {
                    display: none;
                }
            }

            .component {
                &.active.top {
                    &:before {
                        width: 98%;
                        height: 20px;
                        margin: 0 auto;
                        font-size: 14px;
                        text-align: center;
                        display: block;
                        content: '放在这';
                        border: 2px dashed #b5b5b5;
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

    Vue.transition('fadeIn', {
        enterClass: 'fadeInLeft',
        leaveClass: 'fadeOutLeft'
    })

    export default{
        components,

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
            del(item) {
                this.items.$remove(item)
            }
        },

        data: () => {
            return {
                modules,
                components
            }
        }
    }
</script>

