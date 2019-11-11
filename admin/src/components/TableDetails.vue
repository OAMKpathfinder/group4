<template>
  <div class="container px-3 pt-3">
    <div v-if="error" class="alert-red mb-6">
      <span class="font-bold mr-3">Error!</span>{{error}}
    </div>
    <div v-if="!loading" class="max-w-full">
      <div class="header flex flex-row justify-between mb-6">
        <h3 class="p-0">{{ table.name }}</h3>
        <div class="actions">
          <button v-if="checked.length === 0" @click="addItem" class="button-light ml-2">New Item</button>
          <button v-if="checked.length === 1" @click="editItem" class="button-light ml-2">Edit</button>
          <button v-if="checked.length > 0" @click="deleteItem" class="button-red ml-2">{{ verifyDelete ? 'Are you sure?' : 'Delete' }}</button>
        </div>
      </div>
      <div class="card-raised overflow-x-scroll max-w-full">
        <table class="w-full table-auto">
          <thead class="bg-gray-200 font-medium uppercase text-sm text-gray-700">
            <td class="w-6"></td>
            <td
              v-for="attr in Object.keys(table.attributes)"
              :key="attr"
              @click="orderBy(attr)"
            >{{ normalCase(attr) }}</td>
          </thead>
          <tbody v-if="tableData">
            <tr v-for="row in tableData" :key="row.id" class="transition hover:bg-gray-100 hover:shadow-md">
              <td class="w-6"><input type="checkbox" name="select" :id="row.id" :value="row.id" v-model="checked"></td>
              <td v-for="attr in Object.keys(table.attributes)" :key="attr" class="ovf-ellipsis whitespace-no-wrap overflow-hidden">{{ attr === 'password' ? `********` : row[attr] }}</td>
            </tr>
          </tbody>
          <tr v-else><td>Loading...</td></tr>
        </table>
      </div>
    </div>
    <div v-else-if="loading" class="alert">
      Loading...
    </div>
  </div>
</template>

<script>
import startCase from 'lodash.startcase'
import orderBy from 'lodash.orderby'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Table_Details',
  data: function () {
    return {
      table: null,
      tableData: null,
      error: null,
      loading: true,
      checked: [],
      verifyDelete: false,
      orderType: 'asc'
    }
  },
  computed: {
    ...mapState(['tables'])
  },
  mounted: function () {
    this.setRoute()
  },
  methods: {
    ...mapActions(['fetchTables', 'fetchTableData', 'deleteTableRow']),
    normalCase: function (string) { return startCase(string) },
    orderBy: function (column) {
      this.tableData = orderBy(this.tableData, [column], [this.orderType])
      if (this.orderType === 'asc') this.orderType = 'desc'
      else this.orderType = 'asc'
    },
    setRoute: async function () {
      try {
        if (!this.tables) await this.fetchTables()

        this.table = this.tables.filter(t => t.path === this.$route.params.table)[0]
        this.error = null
        this.tableData = await this.fetchTableData(this.table.path)
        this.loading = false
      } catch (err) {
        this.error = 'Could not fetch the table. Reloading...'
      }
      this.loading = false
    },
    editItem: async function () {
      // Open Modal
    },
    deleteItem: async function () {
      const items = this.checked
      if (!this.verifyDelete) {
        this.verifyDelete = true
        return
      }

      let errors = []
      try {
        const path = this.table.path

        items.forEach(async item => {
          try {
            await this.deleteTableRow({ id: item, path: path })
          } catch (error) {
            errors.push(item)
          }
        })
        this.tableData = await this.fetchTableData(this.table.path)
        if (errors.length > 0) {
          throw new Error()
        }
      } catch (error) {
        this.error = `Could not delete ${errors.length} item(s)! They may be included in other tables.`
      }
      this.checked = []
      this.verifyDelete = false
    },
    addItem: async function () {
      // Open Modal
    }
  }
}
</script>

<style lang="postcss" scoped>
td {
  @apply p-2;
}

.ovf-ellipsis {
  text-overflow: ellipsis;
}
</style>
