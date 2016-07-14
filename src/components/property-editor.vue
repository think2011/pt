<template>
    <div class="properties"
         :class="{active:current.data}">
        <h2>{{current.alias}}</h2>
        <div class="contents"
             v-for="(key,value) in current.data">
            <component
                    index="{{$index}}"
                    :component-value.sync="value"
                    :is="value.type">
            </component>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    h2 {
        margin: 12px 15px;
    }
</style>

<script type="text/ecmascript-6">
    import components from '../editors'

    export default{
        components,

        vuex: {
            getters: {
                current: ({render}) => render.current
            }
        },

        data: () => {
            return {
                components
            }
        }
    }
</script>
