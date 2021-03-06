<template>
  <div class="container px-3 pt-3">
    <div v-if="error" class="alert-red mb-6">
      <span class="font-bold mr-3">Error!</span>
      {{ error }}
    </div>
    <div v-if="!loading" class="max-w-full">
      <h3 class="p-0">{{ table.name }}</h3>
      <div class="card-raised max-w-full mt-6 overflow-hidden">
        <div
          class="table-actions flex flex-col xs:flex-row justify-between p-2 h-14"
        >
          <div class="left flex-1 xs:flex-0 mb-2 xs:mb-0">
            <input
              type="text"
              class="input-primary h-full w-full xs:flex-shrink"
              placeholder="Search"
            />
          </div>
          <div class="right flex-grow xs:flex-shrink xs:flex-grow-0 flex">
            <button
              :disabled="checked.length !== 1"
              @click="
                $router.push(
                  `/console/create/${camelCase(table.name)}?id=${checked[0]}`
                )
              "
              class="button-light h-full ml-2"
            >
              Edit
            </button>
          </div>
          <div class="right flex-grow xs:flex-shrink xs:flex-grow-0 flex">
            <button
              :disabled="checked.length < 1"
              @click="deleteItem"
              class="button-red h-full ml-2"
            >
              {{ verifyDelete ? 'Are you sure?' : 'Delete' }}
            </button>
          </div>
        </div>

        <div class="overflow-x-scroll w-full">
          <table class="w-full table-auto">
            <thead
              class="bg-gray-200 font-medium uppercase text-sm text-gray-700"
            >
              <td class="w-6"></td>
              <td
                v-for="attr in Object.keys(table.attributes)"
                :key="attr"
                @click="orderBy(attr)"
              >
                {{ normalCase(attr) }}
              </td>
            </thead>

            <tbody v-if="tableData">
              <tr
                v-for="row in tableData"
                :key="row.id"
                class="transition hover:bg-gray-100 hover:shadow-md"
              >
                <td class="w-6">
                  <input
                    type="checkbox"
                    name="select"
                    :id="row.id"
                    :value="row.id"
                    v-model="checked"
                  />
                </td>
                <td
                  v-for="attr in Object.keys(table.attributes)"
                  :key="attr"
                  class="ovf-ellipsis whitespace-no-wrap overflow-hidden"
                >
                  {{ attr === 'password' ? `********` : row[attr] }}
                </td>
              </tr>
            </tbody>

            <tr v-else>
              <td>Loading...</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="alert">Loading...</div>
  </div>
</template>

<script>
import startCase from 'lodash.startcase'
import orderBy from 'lodash.orderby'
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Table_Details',
  data: function() {
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
  beforeMount: function() {
    this.getSelectedTable()
  },
  methods: {
    ...mapActions(['fetchTableData', 'deleteTableRow']),
    normalCase: function(string) {
      return startCase(string)
    },
    camelCase: function(string) {
      return _.camelCase(string)
    },
    async getSelectedTable() {
      this.table = this.tables.find(
        table => table.name === this.$route.params.table
      )
      try {
        this.tableData = await this.fetchTableData(_.kebabCase(this.table.name))
        this.loading = false
      } catch (err) {
        this.error = err
      }
    },
    orderBy: function(column) {
      this.tableData = orderBy(this.tableData, [column], [this.orderType])
      if (this.orderType === 'asc') this.orderType = 'desc'
      else this.orderType = 'asc'
    },
    deleteItem: async function() {
      const items = this.checked
      if (!this.verifyDelete) {
        this.verifyDelete = true
        return
      }

      let errors = []
      try {
        const path = _.kebabCase(this.table.name)

        items.forEach(async item => {
          try {
            await this.deleteTableRow({ id: item, path: path })
          } catch (error) {
            errors.push(item)
          }
        })
        this.tableData = await this.fetchTableData(_.kebabCase(this.table.name))
        if (errors.length > 0) {
          throw new Error()
        }
      } catch (error) {
        this.error = `Could not delete ${errors.length} item(s)! They may be included in other tables.`
      }
      this.checked = []
      this.verifyDelete = false
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
