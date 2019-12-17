<template>
  <div
    id="menu"
    class="menu h-full bg-transparent flex flex-col md:flex-row transition"
  >
    <nuxt-link
      v-for="item in protectedItems"
      :key="item.name"
      :to="item.to"
      exact
      class="menu-item w-0 w-full sm:w-auto"
    >
      {{ item.name }}
    </nuxt-link>
    <nuxt-link
      v-for="item in menuItems"
      :key="item.name"
      :to="item.to"
      exact
      class="menu-item w-0 w-full sm:w-auto"
    >
      {{ item.name }}
    </nuxt-link>
    <nuxt-link
      v-if="!user"
      class="h-full flex items-center ml-6"
      to="/auth/signin"
    >
      <Button :variant="'primary'" class="w-full">
        Sign in
      </Button>
    </nuxt-link>
    <nuxt-link
      v-else
      class="h-full flex items-center md:ml-6"
      to="/auth/signin"
    >
      <Button :variant="'light'" class="w-full">
        Log out
      </Button>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Button from './Common/Button'

export default {
  components: {
    Button
  },
  data() {
    return {
      menuItems: [
        {
          name: 'How it works',
          to: '/pages/how-it-works'
        },
        {
          name: 'About us',
          to: '/pages/about'
        }
      ],
      protectedItems: [
        {
          name: 'Dashboard',
          to: '/dashboard'
        }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="postcss">
.menu-item {
  @apply h-full flex items-center px-3 border-b-2 border-transparent transition;
}
.menu-item:hover {
  @apply border-primary-500;
}

.active-link {
  perspective: 100;
  @apply text-primary-600 border-primary-500;
}
</style>
