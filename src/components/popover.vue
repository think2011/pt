<template>
    <div class="popover">
        <div v-el:contents
             class="popover-contents"
             v-show="show"
             transition="scale">
            <div @mouseover="showContents"
                 @mouseout="blurContents">
                <div v-el:arrow
                     class="arrow">
                </div>
                <slot name="contents"></slot>
            </div>
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
    .popover-contents {
        min-width: 50px;
        position: absolute;
        top: 0;
        left: 0;
        margin-bottom: 8px;
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
            document.body.appendChild(this.$els.contents)
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
                // TODO ZH 16/9/14
                /* this.blurTimer = setTimeout(() => {
                 this.show = false
                 }, 300)*/
            },

            updatePosition() {
                console.log(this.$els.contents)

                let elContents      = this.$els.contents
                let elArrow         = this.$els.arrow
                let elTriggers      = this.$els.triggers
                let elContentsHalfW = Number.parseFloat(window.getComputedStyle(elContents).width)
                let elContentsHalfH = Number.parseFloat(window.getComputedStyle(elContents).height)
                let elTriggersHalfW = Number.parseFloat(window.getComputedStyle(elTriggers).width)
                let elTriggersHalfH = Number.parseFloat(window.getComputedStyle(elTriggers).height)
                let elTriggersRect  = elTriggers.getBoundingClientRect()
                let [positionTop, positionLeft] = this.position.split(' ')

                switch (positionTop) {
                    case 'top':
                        elContents.style.top = `${elTriggersRect.top - elContentsHalfH - 10}px`
                        break;

                    case 'left':
                        elContents.style.top = `${elTriggersRect.top + elTriggersHalfH / 2 - elContentsHalfH / 2}px`
                        break;

                    default:
                        //
                }

                switch (positionLeft) {
                    case 'center':
                        elContents.style.left = `${elTriggersRect.left + elTriggersHalfW / 2 - elContentsHalfW / 2}px`
                        break;

                    case 'left':
                        elContents.style.left   = `${elTriggersRect.left - elContentsHalfW - 10}px`
                        elArrow.style.top       = `50%`
                        elArrow.style.left      = `100%`
                        elArrow.style.transform = `rotate(270deg)`
                        break;

                    case 'right':
                        elContents.style.left = `${elTriggersRect.left + elTriggersHalfW - elContentsHalfW}px`
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
