<template>
    <div class="properties"
         v-for="item in current"
         track-by="_timestamp"
         :class="{active:current.data}">

        <h2>{{item.alias}}</h2>
        <div class="contents"
             v-for="(key,value) in item.data">
            <component
                    :index="$index"
                    :data.sync="value"
                    :is="value.type">
            </component>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss">
    .properties {
        h2 {
            margin: 12px 15px;
        }

        .contents {
            padding-bottom: 10px;
            margin-bottom: 20px;

            &:not(:last-child) {
                border-bottom: 2px dashed #eee;
            }
        }
    }

</style>

<script type="text/ecmascript-6">
    import components from '../editors'

    export default{
        components,

        vuex: {
            getters: {
                current: ({render}) => [render.current]
            }
        },

        data: () => {
            return {
                components
            }
        }
    }
</script>
