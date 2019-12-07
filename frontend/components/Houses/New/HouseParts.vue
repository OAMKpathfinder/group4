<template>
  <section class="w-full flex flex-col">
    <transition-group name="list" tag="div">
      <div
        v-for="val of value"
        :key="val.id"
        class="card part-list shadow-lg p-3 flex flex-row mb-4"
      >
        <div
          class="
          flex flex-shrink
          h-12 w-12 mr-3 rounded-full
          bg-primary-200 items-center justify-center text-transparent
          transition hover:bg-red-200 text-2xl hover:text-red-800 cursor-pointer"
          @click="deletePart(val.id)"
        >
          <i class="la la-times"></i>
        </div>
        <div class="flex flex-grow flex-col">
          <div class="h-12 flex items-center">
            <h4>
              {{ parts.find((part) => part.id === val.HousePartsId).name }}
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
              :required="true"
              :variant="'primary'"
              :name="'U-value'"
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
        <span class="text-primary-800"> + {{ part.name }} </span>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from '~/components/Common/InputText'
export default {
  components: {
    TextInput
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      parts: [
        {
          id: 1,
          name: 'Window'
        },
        {
          id: 2,
          name: 'Roof'
        },
        {
          id: 3,
          name: 'Door'
        },
        {
          id: 4,
          name: 'Outer Wall'
        }
      ],
      nofParts: 0
    }
  },
  asyncData({ store }) {
    return {}
  },
  methods: {
    addPart(id) {
      this.value.push({
        id: this.nofParts++,
        surface: undefined,
        U_value: undefined,
        HousePartsId: id
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
