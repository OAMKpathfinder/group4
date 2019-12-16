<template>
  <section class="container card p-3 rounded-lg">
    <p v-if="loading">loading</p>
    <div v-if="error" class="alert alert-red">
      {{ error }}
    </div>
    <div v-else class="">
      {{ house }}
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      house: undefined,
      loading: true,
      error: null
    }
  },
  mounted() {
    this.getHouse()
  },
  methods: {
    ...mapActions(['GET_ONE_HOUSE']),
    async getHouse() {
      const id = this.$route.params.id
      try {
        console.log(id)
        this.house = await this.GET_ONE_HOUSE(id)
      } catch (err) {
        this.error = err
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
