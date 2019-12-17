<template>
  <div class="sidebar">
    <div class="brand w-full p-6">
      <h3 class="text-green-800">
        Pathfinder
        <span class="font-main font-thin text-green-800">Console</span>
      </h3>
    </div>
    <div class="menu p-3">
      <div class="menu-group">
        <div class="menu-group-title">General</div>
        <div class="menu-item">
          <router-link to="/console">Overview</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/console/files">Files</router-link>
        </div>
        <div class="menu-item">
          <div class="menu-item flex flex-row justify-between">
            <router-link to="/console/tables/Pages" class="flex flex-grow"
              >Pages</router-link
            >
            <router-link
              to="/console/pages"
              class="hover:bg-gray-400 transition text-gray-500 hover:text-gray-900"
            >
              <i class="las la-plus-square" style="transform: scale(2);"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="menu-group">
        <div class="menu-group-title">Create</div>
        <div
          v-for="item in createTabs"
          :key="item.slug"
          class="menu-item flex flex-row justify-between"
        >
          <router-link
            :to="`/console/tables/${item.view}`"
            class="flex flex-grow items-center"
            >{{ normalCase(item.slug) }}</router-link
          >
          <router-link
            :to="`/console/create/${item.slug}`"
            class="hover:bg-gray-400 transition text-gray-500 hover:text-gray-900"
          >
            <i class="las la-plus-square" style="transform: scale(2);"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import startcase from 'lodash.startcase'

export default {
  name: 'Sidebar',
  components: {},
  data() {
    return {
      loading: true,
      error: null,
      createTabs: [
        {
          slug: 'users',
          view: 'Users'
        },
        {
          slug: 'defaults',
          view: 'Defaults'
        },
        {
          slug: 'heatingSystems',
          view: 'Heating_Systems'
        },
        {
          slug: 'houseParts',
          view: 'House_Parts'
        },
        {
          slug: 'partTypes',
          view: 'Part_Types'
        },
        {
          slug: 'locations',
          view: 'Locations'
        },
        {
          slug: 'materials',
          view: 'Materials'
        }
      ]
    }
  },
  computed: {
    ...mapState(['tables'])
  },
  mounted() {
    this.loadTables()
  },
  methods: {
    ...mapActions(['fetchTables']),
    async loadTables() {
      try {
        this.loading = true
        await this.fetchTables()
      } catch (error) {
        this.error = error
      }
      this.loading = false
    },
    normalCase(string) {
      return startcase(string)
    }
  }
}
</script>

<style lang="postcss" scoped>
.menu-group {
  @apply mb-6 w-full transition;
}
.menu-group-title {
  @apply text-xs text-gray-500 font-medium uppercase px-3 mb-2;
}
.menu-item {
  @apply transition rounded;
}
.menu-item:hover {
  @apply bg-gray-300;
}
.menu-item > a {
  @apply p-3 block;
}

.sidebar {
  left: -320px;
  @apply max-h-full bg-gray-200 transition overflow-y-scroll fixed;
}

@screen lg {
  .sidebar {
    min-width: 320px !important;
    left: 0;
    @apply relative;
  }
}
</style>
