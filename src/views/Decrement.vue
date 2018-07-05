<template>
    <div>
        当前值为：<textarea>{{$store.state.count}}</textarea>
        <input type="button" value="-1" @click="decrementAction">
        {{evenOrOdd}}
    </div>
</template>

<script>
    import {mapMutations,mapActions,mapGetters} from 'vuex'
    export default{
        methods:{
                ...mapMutations([
                        'decrement'
                ]),
                ...mapActions([
                  'decrementAction'
               ])
        },
        computed:{
          ...mapGetters([
            'evenOrOdd'
          ])
        }
    }
</script>

<style scoped>

</style>
