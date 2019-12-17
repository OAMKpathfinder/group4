<template>
  <div class="container flex flex-col justify-center">
    <div class="mx-auto text-center w-full md:w-1/2 mt-10">
      <h1>{{ page.title }}</h1>
      <p>{{ page.excerpt }}</p>
    </div>
    <div class="w-full image-wrapper">
      <img
        :src="`${page.image}`"
        class="w-full mx-auto object-cover rounded-lg shadow-lg"
      />
    </div>
    <div
      class="content w-full md:w-2/3 lg:w-1/2 mx-auto mt-12"
      v-html="page.body"
    ></div>
  </div>
</template>

<script>
export default {
  async asyncData({ store, params, error }) {
    const page = await store.dispatch('GET_PAGE', { slug: params.slug })
    if (!page) {
      error({ statusCode: 404, message: 'Post not found' })
    }
    if (page.image.indexOf('http') !== 0) {
      page.image = `/static/${page.image}`
    }
    return { page }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.excerpt },
        { name: 'twitter:title', content: this.page.title },
        { n: 'twitter:description', c: this.page.excerpt },
        { itemprop: 'name', content: this.page.title },
        { itemprop: 'description', content: this.page.excerpt },
        { property: 'og:title', content: this.page.title },
        { property: 'og:description', content: this.page.excerpt },
        { p: 'og:image', c: this.page.image }
      ]
    }
  }
}
</script>

<style lang="postcss">
.image-wrapper {
  position: relative;
  padding-bottom: 56.2%;
}

.image-wrapper img {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.content > p,
li {
  @apply text-lg;
}

.content > ul {
  list-style-type: disc;
}

.content > ul > li,
.content > ol > li {
  @apply mb-2;
}

.content > ol {
  list-style-type: decimal;
}
</style>
