<template>
  <div class="container px-3 pt-3 flex flex-col">
    <h3>Files</h3>
    <div class="w-full mt-4">
      <file-pond
        name="image-upload"
        ref="pond"
        class-name="my-pond"
        label-idle="Drop image here..."
        allow-multiple="false"
        server="/api/admins/files"
        accepted-file-types="image/jpeg, image/png, image/svg"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"
        @processFile="discard(file)"
      />
    </div>
    <div v-if="!files" class="bg-gray-200 w-full text-center py-8 rounded-lg">
      Nothing here yet.
    </div>
    <div v-else class="card p-3 rounded-lg shadow-lg w-full">
      <div
        v-for="file of files"
        :key="file"
        class="item flex flex-row h-20 py-2 items-center"
      >
        <img
          :src="`/static/${file}`"
          :alt="$file"
          class="h-full w-24 object-cover rounded-lg"
        />
        <span class="ml-4">{{ file }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
import { mapActions } from 'vuex'

const FilePond = vueFilePond(FilePondPluginFileValidateType)

export default {
  data() {
    return {
      myFiles: [],
      files: undefined
    }
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    ...mapActions(['fetchFiles']),
    handleFilePondInit() {
      this.$refs.pond.getFiles()
    },
    discard(file) {
      console.log(file)
    },
    async getFiles() {
      try {
        this.files = await this.fetchFiles()
      } catch (err) {
        this.$emit('error', err)
      }
    }
  },
  components: {
    FilePond
  }
}
</script>

<style lang="postcss">
.filepond--file-action-button {
  cursor: pointer;
}

[data-filepond-item-state='processing-complete'] .filepond--item-panel {
  @apply bg-primary-200;
}

[data-filepond-item-state*='error'] .filepond--item-panel,
[data-filepond-item-state*='invalid'] .filepond--item-panel {
  @apply bg-red-200;
}

.filepond--panel-root {
  background-color: white;
  @apply border;
}
</style>
