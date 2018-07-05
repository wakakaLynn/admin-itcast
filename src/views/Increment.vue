<template>
    <div>
        当前值为：<input type="text" v-model="$store.state.count">
        <input type="button" value="+1" @click="add">
        {{$store.getters.evenOrOdd}}
    </div>
</template>

<script>
    export default{
        data () {
          return{

          }
        },
        methods:{
            add(){
                this.$store.commit('increment')
            }
        },
      mounted(){
          this.$store.dispatch('incrementAction')
      }
    }
</script>

<style scoped>

</style>
