<template>
  <div class="container px-3 pt-3">
    <div v-if="table">
      <h3 class="mb-6">{{ table.name }}</h3>
      <div class="card-raised overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-200 font-medium uppercase text-sm text-gray-700">
            <td v-for="attr in Object.keys(table.attributes)" :key="attr">{{attr}}</td>
          </thead>
          <tbody>
            <tr>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="alert-red">
      <span class="font-bold mr-3">Error!</span>{{error}}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Table_Details',
  data: function () {
    return {
      table: null,
      tableData: null,
      error: null
    }
  },
  computed: {
    ...mapState(['tables'])
  },
  mounted: function () {
    this.setRoute()
  },
  methods: {
    ...mapActions(['fetchTables']),
    setRoute: function () {
      try {
        this.table = this.$store.state.tables.filter(t => t.path === this.$route.params.table)[0]
      } catch (err) {
        this.error = 'Could not fetch the table.'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
td {
  @apply p-2;
}
</style>
