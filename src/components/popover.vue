<template>
    <div class="popover">
        <div v-el:contents
             @mouseover="showContents"
             @mouseout="blurContents"
             v-show="show"
             transition="scale"
             class="contents">
            <div v-el:arrow
                 class="arrow"></div>
            <slot name="contents"></slot>
        </div>

        <div v-el:triggers
             @mouseover="showContents"
             @mouseout="blurContents"
             class="triggers">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .popover {
        position: relative;

        .contents {
            min-width: 50px;
            position: absolute;
            bottom: 100%;
            margin-bottom: 8px;
            left: 0;
            padding: 5px 8px;
            border: 1px solid #ddd;
            box-shadow: 0 1px 5px rgba(99, 99, 99, 0.3);
            background: #fff;
            z-index: 20160907;

            .arrow {
                position: absolute;
                top: 100%;
                left: 50%;

                &:after {
                    content: " ";
                    position: absolute;
                    width: 0;
                    height: 0;
                    transform: translate(-50%, 0);
                    border: 5px solid transparent;
                    border-top-color: #fff;
                }

                &:before {
                    @extend :after;

                    border-width: 6px;
                    border-top-color: #ddd;
                }
            }
        }

        .triggers {
        }
    }
</style>

<script>
    import Vue from 'vue'
    import moment from 'moment'

    export default {
        props: {
            position: {
                default: () => 'top center'
            }
        },

        ready() {
        },

        watch: {},

        methods: {
            showContents() {
                clearTimeout(this.blurTimer)

                this.show = true
                setTimeout(() => {
                    this.updatePosition()
                }, 0)
            },

            blurContents() {
                this.blurTimer = setTimeout(() => {
                    this.show = false
                }, 200)
            },

            updatePosition() {
                let elContents      = this.$els.contents
                let elArrow         = this.$els.arrow
                let elTriggers      = this.$els.triggers
                let elContentsHalfW = Number.parseFloat(window.getComputedStyle(elContents).width)
                let elTriggersHalfW = Number.parseFloat(window.getComputedStyle(elTriggers).width)

                switch (this.position) {
                    case 'top center':
                        elContents.style.left = `${Math.abs(elContentsHalfW / 2 - elTriggersHalfW / 2)}px`
                        break;

                    case 'top right':
                        elContents.style.left = `${Math.abs(elContentsHalfW - elTriggersHalfW)}px`
                        elArrow.style.left    = `90%`
                        break;

                    default:
                        //
                }
            }
        },

        computed: {},

        data() {
            return {
                show       : false,
                triggerType: 'click'
            }
        }
    }
</script>
