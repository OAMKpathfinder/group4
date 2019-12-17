<template>
  <nav class="w-full h-16 relative px-3 md:px-0">
    <div
      class="container px-3 h-full flex flex-row items-center justify-between"
    >
      <nuxt-link to="/" class="h-full flex items-center">
        <Logo />
      </nuxt-link>
      <div id="hamburger" class="md:hidden text-gray-900 text-2xl">
        <i
          v-if="!isOpen"
          class="las la-bars p-3"
          tabindex="0"
          @click="toggleMenu()"
        ></i>
        <i
          v-else
          class="las la-times p-3"
          tabindex="0"
          @click="toggleMenu()"
        ></i>
      </div>
      <HeaderMenu class="hidden md:flex" />
    </div>
    <transition name="coolOpen">
      <div
        v-if="isOpen"
        v-click-outside="toggleMenu"
        class="container menu-mobile p-3 relative z-50"
      >
        <HeaderMenu class="flex md:hidden" />
      </div>
    </transition>
  </nav>
</template>

<script>
import vClickOutside from 'v-click-outside'

import Logo from './Logo'
import HeaderMenu from './HeaderMenu'

export default {
  components: {
    Logo,
    HeaderMenu
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang="postcss">
@screen md {
  .menu-mobile {
    @apply hidden;
  }
}

.menu-mobile {
  box-sizing: border-box;
  @apply h-64 bg-white rounded-lg shadow-2xl top-0;
}

.coolOpen-enter-active,
.coolOpen-leave-active {
  transition: all 0.3s ease-in-out;
}
.coolOpen-enter,
.coolOpen-leave-to {
  perspective: 1000;
  transform: scale(0.95) rotateX(20deg) rotateY(3deg);
  @apply opacity-0;
}
</style>
