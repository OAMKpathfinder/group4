<template>
  <section class="w-full flex flex-col">
    <div v-for="val of value" :key="val.id" class="card shadow-lg"></div>
    <div class="w-full flex flex-row items-center" v-if="parts">
      <span>Add another</span>
      <div
        v-for="part of parts"
        :key="part.id"
        class="p-2 px-4 bg-primary-200 font-bold hover:bg-primary-400 transition ml-3 rounded-full text-primary-900"
      >
        {{ part.name }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
      ]
    }
  },
  asyncData({ store }) {
    return {}
  }
}
</script>

<style></style>
