<template>
    <div>
        <ul class="nav">
            <li
                    v-for="r in renderData"
                    :class="{current: ($index === current)}"
                    @click.prevent="handleTabListClick($index, r)">
                <a href="javascript:">
                    {{{r.head}}}
                </a>
            </li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    ul {
        display: flex;
        background: #EEEEEE;

        li {
            margin-right: 15px;
            border-bottom: 2px solid #eee;

            &.current {
                a {
                    color: #2196F3;
                }
                border-color: #2196F3;
            }

            a {
                font-size: 18px;
                padding: 8px 15px;
                color: #777;
            }
        }
    }

    .tab-content {
        margin-top: 10px;
    }
</style>

<script type="text/ecmascript-6">
    export default {
        props  : {
            current: {
                type   : Number,
                default: 0
            }
        },
        data() {
            return {
                renderData: []
            }
        },
        methods: {
            handleTabListClick(index, el) {
                this.current = index
            }
        }
    }
</script>
