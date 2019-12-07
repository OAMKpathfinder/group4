<template>
  <section class="w-full flex flex-col">
    <div
      class="section-header w-full flex flex-row justify-between items-center mb-4"
    >
      <div>
        <span class="text-left text-gray-700">Your buildings</span>
      </div>
      <div>
        <nuxt-link to="dashboard/buildings/new">
          <Button :variant="'primary'">
            New Building
          </Button>
        </nuxt-link>
      </div>
    </div>
    <div class="empty flex flex-col justify-center items-center mt-10">
      <img src="/illustrations/empty.svg" class="mx-auto" />
      <p>There's nothing here yet.</p>
    </div>
    <div class="list"></div>
  </section>
</template>

<script>
import Button from '../Common/Button'
// import ListItem from './ListItem'
export default {
  components: {
    Button
    // ListItem
  }
}
</script>

<style></style>
