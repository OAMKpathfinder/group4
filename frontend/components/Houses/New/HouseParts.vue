<template>
  <section class="flex flex-col mb-4">
    <transition-group name="list" tag="div">
      <CardTemplate v-for="val of value" :key="val.id">
        <template v-slot:icon>
          <i
            class="la la-home text-primary-800 p-4 text-2xl bg-primary-200 rounded-full"
          ></i>
        </template>
        <template v-slot:heading>
          {{ parts.find((part) => part.id === val.HousePartsId).part }}
        </template>
        <template v-slot:action>
          <i
            class="la la-times text-gray-800 text-2xl p-4 hover:bg-red-200 transition rounded-full"
            @click="deletePart(val.id)"
          >
          </i>
        </template>
        <template v-slot:content>
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
              v-model.number="val.MaterialsId[0]"
              :label="'Material'"
              :items="materials"
              :name="'material'"
              :required="true"
            />
          </div>
        </template>
      </CardTemplate>
    </transition-group>
    <div class="w-full flex flex-row items-center flex-wrap">
      <div
        v-for="part of parts"
        :key="part.id"
        class="pills cursor-pointer mb-2"
        @click="addPart(part.id)"
      >
        <span class="text-primary-800"> + {{ part.part }} </span>
      </div>
    </div>
  </section>
</template>

<script>
import CardTemplate from './CardTemplate'
import TextInput from '~/components/Common/InputText'
import Dropdown from '~/components/Common/Dropdown'

export default {
  components: {
    CardTemplate,
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
        MaterialsId: [undefined]
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

.list-enter-active,
.list-leave-active {
  max-height: 200px;
  transition: all 0.3s ease-in-out;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  max-height: 0;
  @apply opacity-0 overflow-hidden m-0 py-0;
}
</style>
