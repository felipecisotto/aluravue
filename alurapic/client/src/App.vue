<template>
 <div class="corpo">
    <meumenu></meumenu>
    <transition name="pagina">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import menu from './components/shared/menu/menu.vue';

export default {
  components:{
    meumenu:menu
  }
}
</script>

<style lang="scss">

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s
  } 

</style>
