<template>
  <div class="w-full mx-auto h-full overflow-visible">
    <div class="w-full text-center mb-20 md:mb-56 overflow-visible">
      <div class="hero overflow-visible" />
      <h1 class="headline text-3xl sm:text-5xl">
        You’re paying way<br />too much on electricity
      </h1>
      <p>
        Start retrofitting your building and save more on energy expenses.
      </p>
    </div>
    <div class="text-center w-full mb-6">
      <span class="proposition relative">
        <span class="w-full h-4 bg-primary-200 absolute left-0 opacity-50 z-0 -mx-3">
        </span>
        <span class="z-10 font-bold text-primary-600 relative">
          Start by finding out how much you could save...
        </span>
      </span>
    </div>
    <Flickity :options="flickityOptions" class="w-full overflow-visible">
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
      <div class="carrousel-cell card">
        <div class="h-24 bg-primary-600 w-full" />
        <div class="p-3">
          <h6>DECADE</h6>
          <h4 class="mb-3">
            2010s
          </h4>
          <a class="text-primary-600 font-medium no-underline" href="">View potential savings...</a>
        </div>
      </div>
    </Flickity>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flickityOptions: {
        initialIndex: 2,
        prevNextButtons: false,
        pageDots: false,
        groupCells: false,
        wrapAround: false
      }
    }
  }
}
</script>

<style lang="postcss">
.flickity-viewport {
  overflow: visible;
}
.hero {
  background-image: url('/illustrations/hero-bg.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  margin-bottom: -500px;
  height: 500px;
  width: 100%;
  overflow: hidden;
}

.scroll-snap {
  scroll-snap-type: y mandatory;
}

@screen md {
  .hero {
    margin-bottom: -450px;
  }
}

.carrousel-cell {
  margin-right: 10px;
  width: auto;
}

.headline {
  line-height: normal !important;
  @apply text-primary-600 pt-20 pb-10;
}

.card {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}
</style>
