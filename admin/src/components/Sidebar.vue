<template>
  <div class="sidebar w-0 md:w-4/12 lg:w-3/12 xl:w-2/12">
    <div class="brand w-full p-6">
      <h3 class="text-green-800">Pathfinder <span class="font-main font-thin text-green-800">Console</span></h3>
    </div>
    <div class="menu p-3">
      <div class="menu-group">
        <div class="menu-group-title">
          General
        </div>
        <div class="menu-item">
          <a href="/">
            Overview
          </a>
        </div>
      </div>
      <div class="menu-group">
        <div class="menu-group-title">
          Tables
        </div>
        <div class="menu-item">
          <a href="/">
            Users
          </a>
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
    }
  },
  computed: {
    ...mapState(['tables'])
  },
  mounted: async function () {
    this.fetchTables()
  },
  methods: {
    ...mapActions(['fetchTables'])
  }
}
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply h-full bg-gray-100;
}
.menu-group {
  @apply mb-6 w-full transition;
}

.menu-group-title {
  @apply text-xs text-gray-500 font-medium uppercase px-3 mb-2;
}

.menu-item {
  @apply transition rounded;
} .menu-item:hover {
  @apply bg-gray-200;
} .menu-item > a {
  @apply p-3 block;
}
</style>
