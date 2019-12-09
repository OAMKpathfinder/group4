<template>
  <nav class="w-full h-16">
    <div class="container h-full flex flex-row items-center justify-between">
      <nuxt-link to="/" class="h-full flex items-center">
        <Logo />
      </nuxt-link>
      <div class="menu h-full flex flex-row">
        <nuxt-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          exact
          class="menu-item w-0 sm:w-auto"
        >
          {{ item.name }}
        </nuxt-link>
        <nuxt-link
          v-if="!loggedIn"
          class="h-full flex items-center ml-6"
          to="/auth/signin"
        >
          <Button :variant="'primary'" class="w-full">
            Sign in
          </Button>
        </nuxt-link>
        <nuxt-link
          v-else
          class="h-full flex items-center ml-6"
          to="/auth/signin"
        >
          <Button :variant="'light'" class="w-full">
            Log out
          </Button>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo'
import Button from './Common/Button'

export default {
  components: {
    Logo,
    Button
  },
  data() {
    return {
      loggedIn: false,
      menuItems: [
        {
          name: 'How it works',
          to: '/how-it-works'
        },
        {
          name: 'About us',
          to: '/about'
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
  mounted() {
    this.checkAuth()
  },
  methods: {
    async checkAuth() {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) {
          this.$router.push('/auth/signin')
        }
        this.$store.commit('SET_TOKEN', token)

        await this.$store.dispatch('GET_USER')
        this.loggedIn = true
        this.menuItems.unshift(...this.protectedItems)
      } catch (err) {
        this.$router.push('/auth/signin')
      }
    }
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
  @apply text-primary-600 border-primary-500;
}
</style>
