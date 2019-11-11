<template>
  <div class="w-full h-full flex">
    <Sidebar></Sidebar>
    <transition name="move-fade" mode="out-in">
      <router-view :key="$route.path" class="w-full mx-auto my-3"></router-view>
    </transition>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style scoped lang="postcss">
.move-fade-enter-active, .move-fade-leave-active {
  transition: all .5s cubic-bezier(0.165, 1, 0.075, 1);
  transform: translateX(0);
}

.move-fade-enter {
  opacity: 0;
  transform: translateX(-3em)
}
.move-fade-leave-to {
  opacity: 0;
  transform: translateX(3em)
}
</style>
