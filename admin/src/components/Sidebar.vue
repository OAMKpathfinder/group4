<template>
  <div class="sidebar">
    <div class="brand w-full p-6">
      <h3 class="text-green-800">Pathfinder <span class="font-main font-thin text-green-800">Console</span></h3>
    </div>
    <div class="menu p-3">
      <div class="menu-group">
        <div class="menu-group-title">
          General
        </div>
        <div class="menu-item">
          <router-link to="/console">
            Overview
          </router-link>
        </div>
      </div>
      <div class="menu-group">
        <div class="menu-group-title">
          Tables
        </div>
        <div v-if="loading" class="menu-item">
          <a>Loading...</a>
        </div>
        <div v-else v-for="table in tables" :key="table.path" class="menu-item">
          <router-link :to="`/console/tables/${table.path}`">
            {{ table.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Sidebar',
  components: {},
  data: function () {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    ...mapState(['tables'])
  },
  mounted: async function () {
    this.loadTables()
  },
  methods: {
    ...mapActions(['fetchTables']),
    loadTables: async function () {
      try {
        this.loading = true
        await this.fetchTables()
      } catch (error) {
        this.error = error
      }
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.menu-group {
  @apply mb-6 w-full transition;
} .menu-group-title {
  @apply text-xs text-gray-500 font-medium uppercase px-3 mb-2;
} .menu-item {
  @apply transition rounded;
} .menu-item:hover {
  @apply bg-gray-200;
} .menu-item > a {
  @apply p-3 block;
}

.sidebar {
  left: -320px;
  @apply h-full bg-gray-100 absolute transition;
}

@screen lg {
  .sidebar {
    min-width: 320px !important;
    left: 0;
    @apply relative;
  }
}
</style>
