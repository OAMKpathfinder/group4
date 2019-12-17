<template>
  <div class="container px-3 pt-3 flex flex-col">
    <h3>Create</h3>
    <div
      class="card p-3 rounded-lg shadow-lg w-full xs:w-full md:w-1/2 mt-4 mx-auto"
    >
      <component :is="component" @error="showError" class="mx-auto"></component>
      <div v-if="error" class="alert alert-red alert-error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import users from '../components/Create/Users'
import heatingSystems from '../components/Create/HeatingSystems'
import houseParts from '../components/Create/HouseParts'
import partTypes from '../components/Create/HousePartsTypes'
import locations from '../components/Create/Locations'
import materials from '../components/Create/Materials'
import defaults from '../components/Create/Decades'

export default {
  name: 'Create',
  components: {
    users,
    heatingSystems,
    houseParts,
    partTypes,
    locations,
    materials,
    defaults
  },
  data() {
    return {
      component: 'users',
      error: null
    }
  },
  mounted() {
    this.component = this.$route.params.name
  },
  methods: {
    showError(error) {
      this.error = error
    }
  }
}
</script>

<style></style>
