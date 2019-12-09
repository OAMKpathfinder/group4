<template>
  <section class="flex flex-col mb-4">
    <transition-group name="list" tag="div">
      <div
        v-for="val of value"
        :key="val.id"
        class="card part-list shadow-lg p-3 flex flex-row mb-4"
      >
        <div
          class="
          flex flex-shrink
          circle mr-3 rounded-full
          bg-primary-200 items-center justify-center text-transparent
          transition hover:bg-red-200 text-2xl hover:text-red-800 cursor-pointer"
          @click="deletePart(val.id)"
        >
          <i class="la la-times"></i>
        </div>
        <div class="flex flex-grow flex-col">
          <div class="h-12 flex items-center">
            <h4>
              {{ parts.find((part) => part.id === val.HousePartsId).part }}
            </h4>
          </div>
          <div class="form flex flex-col md:grid grid-gap-4 grid-columns-3">
            <TextInput
              v-model="val.surface"
              :label="'Surface [m2]'"
              :placeholder="'21.2'"
              :type="'number'"
              :required="true"
              :variant="'primary'"
              :name="'surface'"
            />
            <TextInput
              v-model="val['U_value']"
              :label="'U-value'"
              :placeholder="'0.4'"
              :type="'number'"
              :variant="'primary'"
              :name="'U-value'"
            />
            <Dropdown
              v-model.number="val.MaterialsId"
              :label="'Material'"
              :items="materials"
              :name="'material'"
              :required="true"
            />
          </div>
        </div>
      </div>
    </transition-group>
    <div class="w-full flex flex-row items-center">
      <div
        v-for="part of parts"
        :key="part.id"
        class="pills cursor-pointer"
        @click="addPart(part.id)"
      >
        <span class="text-primary-800"> + {{ part.part }} </span>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from '~/components/Common/InputText'
import Dropdown from '~/components/Common/Dropdown'

export default {
  components: {
    TextInput,
    Dropdown
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      parts: [],
      materials: [],
      nofParts: 0
    }
  },
  async mounted() {
    const parts = await this.$store.dispatch('GET_PARTS')
    const materials = await this.$store.dispatch('GET_MATERIALS')

    this.parts = parts
    this.materials = materials
  },
  methods: {
    addPart(id) {
      this.value.push({
        id: this.nofParts++,
        surface: undefined,
        U_value: undefined,
        HousePartsId: id,
        MaterialsId: undefined
      })
    },
    deletePart(id) {
      const idToDelete = this.value.findIndex((val) => val.id === id)
      this.value.splice(idToDelete, 1)
    }
  }
}
</script>

<style lang="postcss" scoped>
.pills {
  @apply h-10 px-4 bg-primary-200 font-bold transition ml-3 rounded-full text-primary-900 flex flex-row items-center;
}
.circle {
  min-width: 2em;
  min-height: 2em;
  @apply w-8 h-8;
}
.part-list {
  max-height: 500px;
  overflow: hidden;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease-in-out;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  max-height: 0;
  @apply py-0 m-0 opacity-0 overflow-hidden;
}
</style>
