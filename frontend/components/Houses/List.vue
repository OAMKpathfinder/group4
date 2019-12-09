<template>
  <section class="w-full flex flex-col">
    <div class="section-header">
      <div>
        <span class="text-left text-gray-700">Your buildings</span>
      </div>
      <div>
        <nuxt-link to="/dashboard/buildings/new" exact>
          <Button :variant="'primary'">
            New Building
          </Button>
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="loading"
      class="w-full h-48 bg-gray-200 text-center flex items-center justify-center"
    >
      <p class="text-center">Loading...</p>
    </div>
    <div
      v-else-if="$store.state.houses.length === 0"
      class="empty flex flex-col justify-center items-center mt-10"
    >
      <img src="/illustrations/empty.svg" class="mx-auto" />
      <p>There's nothing here yet.</p>
    </div>
    <div v-else-if="error" class="alert alert-red">
      {{ error }}
      <Button :variant="'red'" @click="retry">Retry</Button>
    </div>
    <div v-else class="list">
      <ListItem v-for="house of houses" :key="house.id" :item="house" />
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Button from '../Common/Button'
import ListItem from './ListItem'

export default {
  components: {
    Button,
    ListItem
  },
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState(['houses'])
  },
  mounted() {
    this.loadHouses()
  },
  methods: {
    ...mapActions(['GET_HOUSES']),
    async loadHouses() {
      if (this.error) {
        return
      }
      try {
        await this.GET_HOUSES()
      } catch (err) {
        this.error = err
      }
      this.loading = false
    },
    retry() {
      this.error = null
      this.loadHouses()
    }
  }
}
</script>

<style scoped lang="postcss">
.section-header {
  @apply w-full flex flex-row justify-between items-center mb-4;
}
</style>
